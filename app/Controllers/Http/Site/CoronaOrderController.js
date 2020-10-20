'use strict';
const CoronaOrder = use('App/Models/CoronaOrder');
const CoronaTest = use('App/Models/CoronaTest');
const CoronaDiscount = use('App/Models/CoronaDiscount');
const axios = require('axios');
const Env = use('Env');
class CoronaOrderController {
  async request({ request }) {
    let data = request.only(CoronaOrder.allowField);
    let selected_test = await CoronaTest.findOrFail(data.selected_test.id);
    data.prepay_amount = +selected_test.prepay_amount * +data.count;
    data.total_amount = +selected_test.total_amount * +data.count;
    data.payable_amount = data.total_amount - data.prepay_amount;
    if (data.discount && data.discount.amount) {
      let discount = await CoronaDiscount.findBy({ code: data.discount.code });
      if (discount) {
        data.payable_amount -= +discount.amount;
      }
    }
    if (data.role_discount_amount) {
      let matchDiscount = selected_test.discount_roles
        .filter((item) => +data.count >= +item.count)
        .sort((a, b) => {
          return +b.count - +a.count;
        });
      if (matchDiscount && matchDiscount.length) {
        data.payable_amount -= +data.count * +matchDiscount[0].discount;
      }
    }
    let order = await CoronaOrder.create(data);
    await order.load('city');
    return order;
  }

  async paymentRequest({ response, params: { id } }) {
    let order = await CoronaOrder.find(id);
    let transaction = await order.transaction().fetch();
    let { data } = await axios.post(
      'https://sep.shaparak.ir/MobilePG/MobilePayment',
      {
        Action: 'Token',
        Amount: +transaction.amount*10,
        TerminalId: Env.get('SAMAN_TERMINAL_ID'),
        ResNum: transaction.id,
        RedirectUrl: Env.get('BANK_RETURN_URL'),
      }
    );
    if (data.status == 1) {
      return response.status(200).json({
        token: data.token,
        address: 'https://sep.shaparak.ir/MobilePG/MobilePayment',
      });
    } else {
      response.status(400).json(data);
    }
  }
  async callback({ request, response }) {
    let { chargeRequestId } = request.post();
    let corona_order = await CoronaOrder.query()
      .whereHas('transaction', (builder) =>
        builder.where({ id: chargeRequestId })
      )
      .first();
    await corona_order.loadMany(['transaction', 'city']);
    return corona_order;
  }
  async tracking({ request }) {
    let { nationalCode, mobile } = request.get();
    return CoronaOrder.query()
      .where({
        mobile,
        nationalCode,
      })
      .setVisible([
        'created_at',
        'status',
        'payment_status',
        'amount',
        'doctor_id',
      ])
      .where({ is_deleted: false })
      .fetch();
  }
}

module.exports = CoronaOrderController;

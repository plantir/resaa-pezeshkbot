'use strict';
const CoronaOrder = use('App/Models/CoronaOrder');
const CoronaTransaction = use('App/Models/CoronaTransaction');
const axios = require('axios');
const Env = use('Env');
class CoronaOrderController {
  async request({ request }) {
    let data = request.only(CoronaOrder.allowField);
    data.prepay_amount = +data.selected_test.prepay_amount;
    data.total_amount = +data.selected_test.total_amount;
    data.payable_amount = data.total_amount - data.prepay_amount;
    if (data.discount && data.discount.amount) {
      data.payable_amount -= +data.discount.amount;
    }
    if (data.role_discount_amount) {
      data.payable_amount -= +data.role_discount_amount;
    }
    let order = await CoronaOrder.create(data);
    await order.load('city');
    return order;
  }

  async paymentRequest({ response, params: { id } }) {
    let order = await CoronaOrder.find(id);
    let transaction = await order.transaction().fetch();
    let res = await axios.post(
      'https://sep.shaparak.ir/MobilePG/MobilePayment',
      {
        Action: 'Token',
        Amount: transaction.amount,
        TerminalId: Env.get('SAMAN_TERMINAL_ID'),
        ResNum: transaction.id,
        RedirectUrl: Env.get('BANK_RETURN_URL'),
      }
    );
    if (res.status == 1) {
      return {
        token: res.token,
        address: 'https://sep.shaparak.ir/MobilePG/MobilePayment',
      };
    } else {
      response.status(400).json(res.data);
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

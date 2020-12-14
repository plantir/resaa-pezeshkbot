'use strict';
const CoronaOrder = use('App/Models/CoronaOrder');
const CoronaTest = use('App/Models/CoronaTest');
const CoronaDiscount = use('App/Models/CoronaDiscount');
const CoronaService = use('App/Models/CoronaService');
const axios = require('axios');
const Env = use('Env');
const moment = use('moment');
class CoronaOrderController {
  async request({ request }) {
    let data = request.only(CoronaOrder.allowField);
    let selected_test = await CoronaTest.findOrFail(data.selected_test.id);
    data.city_id = selected_test.city_id;
    data.prepay_amount = +selected_test.prepay_amount;
    data.total_amount = +selected_test.total_amount;
    if (
      data.is_fast &&
      selected_test.fast_option &&
      selected_test.fast_option.available
    ) {
      data.prepay_amount += +selected_test.fast_option.prepay_amount;
      data.total_amount += +selected_test.fast_option.total_amount;
    }

    if (selected_test.discount_roles) {
      let matchDiscount = selected_test.discount_roles
        .filter((item) => +data.count >= +item.count)
        .sort((a, b) => {
          return +b.count - +a.count;
        });
      if (matchDiscount && matchDiscount.length) {
        data.role_discount_amount = +matchDiscount[0].discount;
        data.total_amount -= data.role_discount_amount;
      }
    }
    if (data.selected_services) {
      data.selected_services = await Promise.all(
        data.selected_services.map(async (id) => {
          let service = await CoronaService.query()
            .where({ id })
            .where({ is_deleted: false })
            .first();
          if (service) {
            data.total_amount += service.price;
          }
          return service.toJSON();
        })
      );
    }
    data.total_amount *= data.count;
    data.prepay_amount *= data.count;
    if (data.discount && data.discount.amount) {
      let discount = await CoronaDiscount.findBy({ code: data.discount.code });
      if (discount) {
        data.prepay_amount -= +discount.amount;
      }
    }
    data.payable_amount = data.total_amount - data.prepay_amount;
    let order = await CoronaOrder.create(data);
    await order.load('city');
    return order;
  }

  async paymentRequest({ response, params: { guid } }) {
    let order = await CoronaOrder.query().where({ guid }).firstOrFail();
    let transaction = await order.transaction().fetch();
    let created_at = moment().format('YYYY-MM-DD HH:mm:ss');
    transaction.created_at = created_at;
    order.created_at = created_at;
    await transaction.save();
    await order.save();
    let { data } = await axios.post(
      'https://sep.shaparak.ir/MobilePG/MobilePayment',
      {
        Action: 'Token',
        Amount: +transaction.amount * 10,
        TerminalId: Env.get('SAMAN_TERMINAL_ID'),
        ResNum: order.guid,
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
    let { requestId } = request.post();
    let corona_order = await CoronaOrder.query()
      .where({ guid: requestId })
      .with('transaction')
      .with('city')
      .setVisible([
        'guid',
        'user_fullname',
        'selected_test',
        'created_at',
        'total_amount',
        'prepay_amount',
        'role_discount_amount',
        'discount',
        'payable_amount',
      ])
      .first();
    // await corona_order.loadMany(['transaction', 'city']);
    return corona_order;
  }
  async tracking({ request }) {
    let { nationalCode, mobile } = request.get();
    return CoronaOrder.query()
      .where({
        user_mobile: mobile,
        user_nationalcode: nationalCode,
      })
      .with('transaction', (builder) =>
        builder.setVisible(['status', 'tracking_code'])
      )
      .setVisible([
        'id',
        'created_at',
        'selected_test',
        'status',
        'count',
        'total_amount',
        'prepay_amount',
        'payable_amount',
      ])
      .where({ is_deleted: false })
      .fetch();
  }

  async show({ params: { guid } }) {
    return CoronaOrder.query()
      .with('city', (builder) => builder.with('tests'))
      .setVisible([
        'guid',
        'user_fullname',
        'user_mobile',
        'user_nationalcode',
        'user_address',
        'count',
        'selected_test',
        'selected_services',
        'created_at',
        'total_amount',
        'prepay_amount',
        'role_discount_amount',
        'is_fast',
        'discount',
        'payable_amount',
      ])
      .where({ guid })
      .firstOrFail();
  }
  async verify({ params: { guid } }) {
    let test = await CoronaOrder.query().where({ guid }).firstOrFail();
    test.is_verified = true;
    return test.save();
  }
}

module.exports = CoronaOrderController;

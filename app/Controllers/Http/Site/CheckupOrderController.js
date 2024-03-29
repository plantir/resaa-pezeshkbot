'use strict';
const CheckupOrder = use('App/Models/CheckupOrder');
const CheckupTest = use('App/Models/CheckupTest');
const CheckupDiscount = use('App/Models/CheckupDiscount');
const axios = require('axios');
const Env = use('Env');
const moment = use('moment');
class CheckupOrderController {
  async request({ request }) {
    let data = request.only(CheckupOrder.allowField);
    let selected_test = await CheckupTest.findOrFail(data.test_id);
    data.selected_test = selected_test.toJSON();
    data.city_id = selected_test.city_id;
    data.prepay_amount = +selected_test.prepay_amount;
    data.total_amount = +selected_test.total_amount;
    // data.total_amount += +selected_test.shipment_amount;
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
        data.selected_services.map(async (title) => {
          let service = selected_test.services.find(
            (service) => service.title == title
          );
          if (service) {
            data.total_amount += service.total_amount;
            data.prepay_amount += service.prepay_amount;
          }
          return service;
        })
      );
    }
    data.total_amount *= data.count;
    data.prepay_amount *= data.count;
    if (data.discount && data.discount.amount) {
      let discount = await CheckupDiscount.findBy({ code: data.discount.code });
      if (discount) {
        data.prepay_amount -= +discount.amount;
        data.total_amount -= +discount.amount;
      }
    }
    data.payable_amount = data.total_amount - data.prepay_amount;
    let order = await CheckupOrder.create(data);
    await order.load('city');
    return order;
  }

  async paymentRequest({ response, params: { guid } }) {
    let order = await CheckupOrder.query().where({ guid }).firstOrFail();
    let transaction = await order.transaction().fetch();
    let created_at = moment().format('YYYY-MM-DD HH:mm:ss');
    transaction.created_at = created_at;
    order.created_at = created_at;
    await transaction.save();
    await order.save();
    let amount = +transaction.amount * 10
    let orderId = order.guid
    let redirect = Env.get('BANK_RETURN_URL')
    let ApiKey = Env.get('BISTPAY_API_KEY')
    let {data} = await axios.post(
      'https://pay.bistpay.com/Gateway/Send',
      {
        amount ,
        orderId,
        redirect,
      },{
        headers:{
          "Content-Type":"application/json",
          ApiKey
        }
      }
    );
    if(data && data.status == 1){
        return response.status(200).json({
          address: `https://pay.bistpay.com/13/2/${data.token}`,
        });
    } else {
      response.status(400).json(data);
    }
  }
  async callback({ request, response }) {
    let { requestId } = request.post();
    let corona_order = await CheckupOrder.query()
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
    return CheckupOrder.query()
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
    return CheckupOrder.query()
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
    let test = await CheckupOrder.query().where({ guid }).firstOrFail();
    test.is_verified = true;
    return test.save();
  }
}

module.exports = CheckupOrderController;

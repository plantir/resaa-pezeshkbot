'use strict';

const request = require('request');

const CoronaDiscount = use('App/Models/CoronaDiscount');
class CoronaDiscountController {
  async check({ request }) {
    let { code } = request.post();
    return CoronaDiscount.query()
      .where({ is_deleted: false })
      .where({ code })
      .firstOrFail();
  }
}

module.exports = CoronaDiscountController;

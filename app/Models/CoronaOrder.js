'use strict';

/** @type {typeof import('@adonisjs/lucid/src/Lucid/Model')} */
const Model = use('BaseModel');

class CoronaOrder extends Model {
  static listOption(qs) {
    qs.withArray = ['city', 'test', 'transaction'] //.concat(qs.withArray || []);
    return super.listOption(qs);
  }

  static get allowField() {
    return [
      'city_id',
      'test_id',
      'transaction_id',
      'user_mobile',
      'user_fullname',
      'user_nationalcode',
      'user_address',
      'status',
      'prepay_amount',
      'total_amount',
      'discount',
      'description',
    ];
  }

  city() {
    return this.belongsTo('App/Models/CoronaCity','city_id');
  }

  transaction() {
    return this.belongsTo('App/Models/CoronaTransaction','transaction_id');
  }

  test() {
    return this.belongsTo('App/Models/CoronaTest','test_id');
  }
}

module.exports = CoronaOrder;

'use strict';

/** @type {typeof import('@adonisjs/lucid/src/Lucid/Model')} */
const Model = use('BaseModel');

class CoronaOrder extends Model {
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
      'role_discount_amount',
      'payable_amount',
      'discount',
      'count',
      'selected_test',
      'is_fast',
      'is_verified',
      'selected_services',
      'description',
      'is_checked',
      'sampler_id',
      'labratory_id',
    ];
  }
  static get jsonFields() {
    return ['discount', 'selected_test', 'selected_services'];
  }
  static boot() {
    super.boot();
    this.addTrait('ConvertToJson');
    this.addHook('beforeCreate', 'CoronaOrderHook.beforeCreate');
    this.addHook('afterCreate', 'CoronaOrderHook.afterCreate');
  }
  static listOption(qs) {
    qs.withArray = ['city', 'test', 'transaction', 'labratory', 'sampler']; //.concat(qs.withArray || []);
    return super.listOption(qs);
  }

  city() {
    return this.belongsTo('App/Models/City', 'city_id');
  }

  transaction() {
    return this.belongsTo('App/Models/Transaction');
  }

  test() {
    return this.belongsTo('App/Models/CoronaTest', 'test_id');
  }

  labratory() {
    return this.belongsTo('App/Models/Labratory', 'labratory_id');
  }

  sampler() {
    return this.belongsTo('App/Models/Sampler', 'sampler_id');
  }
}

module.exports = CoronaOrder;

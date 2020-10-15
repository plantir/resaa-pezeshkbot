'use strict';

/** @type {typeof import('@adonisjs/lucid/src/Lucid/Model')} */
const Model = use('BaseModel');

class CoronaTest extends Model {
  static get allowField() {
    return [
      'name',
      'color',
      'sort_order',
      'description',
      'city_id',
      'prepay_amount',
      'total_amount',
      'description',
    ];
  }
  static listOption(qs) {
    qs.withArray = ['city'].concat(qs.withArray || []);
    return super.listOption(qs);
  }
  city() {
    return this.belongsTo('App/Models/CoronaCity');
  }
}

module.exports = CoronaTest;

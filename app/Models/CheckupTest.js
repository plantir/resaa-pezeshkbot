'use strict';

/** @type {typeof import('@adonisjs/lucid/src/Lucid/Model')} */
const Model = use('BaseModel');

class CheckupTest extends Model {
  static get allowField() {
    return [
      'name',
      'color',
      'sort_order',
      'description',
      'city_id',
      'landing_id',
      'prepay_amount',
      'total_amount',
      'discount_roles',
      'services',
      'description',
      'image',
      'result_time_min',
      'result_time_max',
    ];
  }
  static get jsonFields() {
    return ['discount_roles', 'description', 'services'];
  }
  static boot() {
    super.boot();
    this.addTrait('ConvertToJson');
  }
  static listOption(qs) {
    qs.withArray = ['city'].concat(qs.withArray || []);
    return super.listOption(qs);
  }
  city() {
    return this.belongsTo('App/Models/City', 'city_id');
  }
}

module.exports = CheckupTest;

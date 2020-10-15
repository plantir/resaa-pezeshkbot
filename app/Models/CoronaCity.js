'use strict';

/** @type {typeof import('@adonisjs/lucid/src/Lucid/Model')} */
const Model = use('BaseModel');

class City extends Model {
  static get allowField() {
    return ['name', 'sort_order'];
  }
}

module.exports = City;

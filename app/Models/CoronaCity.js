'use strict';

/** @type {typeof import('@adonisjs/lucid/src/Lucid/Model')} */
const Model = use('BaseModel');

class CoronaCity extends Model {
  static get allowField() {
    return ['name', 'sort_order'];
  }
  tests(){
    return this.hasMany('App/Models/CoronaTest','id','city_id')
  }
}

module.exports = CoronaCity;

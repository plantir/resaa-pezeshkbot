'use strict';

/** @type {typeof import('@adonisjs/lucid/src/Lucid/Model')} */
const Model = use('BaseModel');

class CoronaOldCity extends Model {
  static boot() {
    super.boot();
    this.addTrait('ConvertToJson');
  }
  static get jsonFields() {
    return ['testsItems'];
  }
  static get allowField() {
    return ['name', 'testsItems'];
  }
}

module.exports = CoronaOldCity;

'use strict';

/** @type {typeof import('@adonisjs/lucid/src/Lucid/Model')} */
const Model = use('BaseModel');

class CoronaLabratory extends Model {
  static get allowField() {
    return ['name'];
  }
}

module.exports = CoronaLabratory;

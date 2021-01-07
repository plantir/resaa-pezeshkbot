'use strict';

/** @type {typeof import('@adonisjs/lucid/src/Lucid/Model')} */
const Model = use('BaseModel');

class PrescriptTest extends Model {
  static boot() {
    super.boot();
  }
  static get allowField() {
    return ['name', 'amount'];
  }
}

module.exports = PrescriptTest;

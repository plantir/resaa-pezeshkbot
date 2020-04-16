'use strict';

/** @type {typeof import('@adonisjs/lucid/src/Lucid/Model')} */
const Model = use('BaseModel');

class Patient extends Model {
  static get allowField() {
    return ['name', 'mobile', 'email'];
  }
}

module.exports = Patient;

'use strict';

/** @type {typeof import('@adonisjs/lucid/src/Lucid/Model')} */
const Model = use('BaseModel');

class Insurance extends Model {
  static boot() {
    super.boot();
  }
  static get allowField() {
    return ['name'];
  }
}

module.exports = Insurance;

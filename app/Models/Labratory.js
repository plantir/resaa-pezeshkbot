'use strict';

/** @type {typeof import('@adonisjs/lucid/src/Lucid/Model')} */
const Model = use('BaseModel');

class Labratory extends Model {
  static get allowField() {
    return ['name'];
  }
}

module.exports = Labratory;

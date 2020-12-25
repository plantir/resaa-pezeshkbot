'use strict';

/** @type {typeof import('@adonisjs/lucid/src/Lucid/Model')} */
const Model = use('BaseModel');

class Sampler extends Model {
  static get allowField() {
    return ['name'];
  }
}

module.exports = Sampler;

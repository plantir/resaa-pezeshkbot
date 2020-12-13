'use strict';

/** @type {typeof import('@adonisjs/lucid/src/Lucid/Model')} */
const Model = use('BaseModel');

class CoronaService extends Model {
  static get allowField() {
    return ['title', 'description', 'price'];
  }
}

module.exports = CoronaService;

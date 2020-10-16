'use strict';

/** @type {typeof import('@adonisjs/lucid/src/Lucid/Model')} */
const Model = use('BaseModel');

class CoronaTransaction extends Model {
  static get allowField() {
    return ['amount', 'status', 'description', 'tracking_code', 'receipt'];
  }

}

module.exports = CoronaTransaction;

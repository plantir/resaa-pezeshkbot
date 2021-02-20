'use strict'

/** @type {typeof import('@adonisjs/lucid/src/Lucid/Model')} */
const Model = use('BaseModel')

class PrescriptDiscount extends Model {
  static get allowField() {
    return ['name', 'amount', 'code'];
  }
}

module.exports = PrescriptDiscount

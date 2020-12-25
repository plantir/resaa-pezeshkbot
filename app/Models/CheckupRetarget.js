'use strict'

/** @type {typeof import('@adonisjs/lucid/src/Lucid/Model')} */
const Model = use('Model')

class CheckupRetarget extends Model {
  discount() {
    return this.belongsTo('App/Models/CheckupDiscount','discount_id');
  }
}

module.exports = CheckupRetarget

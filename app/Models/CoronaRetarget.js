'use strict';

/** @type {typeof import('@adonisjs/lucid/src/Lucid/Model')} */
const Model = use('Model');

class CoronaRetarget extends Model {
  discount() {
    return this.belongsTo('App/Models/CoronaDiscount','discount_id');
  }
}

module.exports = CoronaRetarget;

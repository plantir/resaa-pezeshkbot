'use strict';

/** @type {typeof import('@adonisjs/lucid/src/Lucid/Model')} */
const Model = use('Model');

class DoctorAnswer extends Model {
  question() {
    return this.belongsTo('App/Models/Question');
  }
  doctor() {
    return this.belongsTo('App/Models/Doctor');
  }
}

module.exports = DoctorAnswer;

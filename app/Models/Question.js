'use strict';

/** @type {typeof import('@adonisjs/lucid/src/Lucid/Model')} */
const Model = use('Model');

class Question extends Model {
  static boot() {
    super.boot();
    this.addHook('afterCreate', 'QuestionHook.afterCreate');
  }
  user() {
    return this.belongsTo('App/Models/User');
  }
  answer() {
    return this.hasMany('App/Models/DoctorAnswer');
  }
}

module.exports = Question;

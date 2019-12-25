'use strict';

/** @type {typeof import('@adonisjs/lucid/src/Lucid/Model')} */
const Model = use('BaseModel');

class QuizAnswer extends Model {
  static boot() {
    super.boot();
    this.addHook('afterCreate', 'QuizAnswerHook.afterCreate');
  }
}

module.exports = QuizAnswer;

'use strict';

/** @type {typeof import('@adonisjs/lucid/src/Lucid/Model')} */
const Model = use('BaseModel');

class Quiz extends Model {
  static boot() {
    super.boot();
    this.addTrait('ConvertToJson');
    this.addTrait('ConvertToBase64');
  }

  static get allowField() {
    return ['title', 'question', 'answers', 'image', 'send_time'];
  }
  static get jsonFields() {
    return ['answers'];
  }
  static get base64Fields() {
    return ['question'];
  }
  static get dates() {
    return super.dates.concat(['send_time']);
  }
  static listOption(qs) {
    qs.withArray = ['quiz_answers'].concat(qs.withArray || []);
    return super.listOption(qs);
  }
  quiz_answers() {
    return this.hasMany('App/Models/QuizAnswer');
  }
}

module.exports = Quiz;

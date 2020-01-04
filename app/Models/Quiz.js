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
    return ['title', 'question', 'answers'];
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
}

module.exports = Quiz;

'use strict';

/** @type {typeof import('@adonisjs/lucid/src/Lucid/Model')} */
const Model = use('BaseModel');

class Quiz extends Model {
  static boot() {
    super.boot();
    this.addTrait('convertToJson');
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
}

module.exports = Quiz;

'use strict';

/** @type {import('@adonisjs/lucid/src/Schema')} */
const Schema = use('Schema');
/** @type {typeof import('../../../Models/TestAnswer')} */
const TestAnswer = use('App/Models/TestAnswer');
class ChangeDoctorAnswerSchema extends Schema {
  async up() {
    let testanswers = await TestAnswer.all();
    for (let test of testanswers.rows) {
      test.doctor_answer = [test.doctor_answer];
      await test.save();
    }
    this.table('test_answers', (table) => {
      // alter table
      table.json('doctor_answer').alter();
    });
  }

  down() {
    this.table('test_answers', (table) => {
      // reverse alternations
    });
  }
}

module.exports = ChangeDoctorAnswerSchema;

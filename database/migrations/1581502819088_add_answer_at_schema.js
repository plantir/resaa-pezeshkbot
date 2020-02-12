'use strict';

/** @type {import('@adonisjs/lucid/src/Schema')} */
const Schema = use('Schema');

class AddAnswerAtSchema extends Schema {
  up() {
    this.table('test_answers', table => {
      table.datetime('answer_at').after('doctor_answer');
      // alter table
    });
  }

  down() {
    this.table('test_answers', table => {
      // reverse alternations
      table.dropColumn('answer_at');
    });
  }
}

module.exports = AddAnswerAtSchema;

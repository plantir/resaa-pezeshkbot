'use strict';

/** @type {import('@adonisjs/lucid/src/Schema')} */
const Schema = use('Schema');

class AddQuizImageSchema extends Schema {
  up() {
    this.table('quizzes', table => {
      // alter table
      table.string('image').after('title');
    });
  }

  down() {
    this.table('quizzes', table => {
      // reverse alternations
      table.dropColumn('image');
    });
  }
}

module.exports = AddQuizImageSchema;

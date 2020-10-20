'use strict';

/** @type {import('@adonisjs/lucid/src/Schema')} */
const Schema = use('Schema');

class AddTestAnswerDescriptionSchema extends Schema {
  up() {
    this.table('test_answers', (table) => {
      // alter table
      table.text('description').after('files');
    });
  }

  down() {
    this.table('test_answers', (table) => {
      // reverse alternations
      table.dropColumn('description');
    });
  }
}

module.exports = AddTestAnswerDescriptionSchema;

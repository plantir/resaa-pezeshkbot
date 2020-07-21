'use strict';

/** @type {import('@adonisjs/lucid/src/Schema')} */
const Schema = use('Schema');

class AddIsSeenSchema extends Schema {
  up() {
    this.table('test_answers', (table) => {
      // alter table
      table.boolean('is_seen').after('status').defaultTo(false);
    });
  }

  down() {
    this.table('test_answers', (table) => {
      // reverse alternations
      table.dropColumn('is_seen');
    });
  }
}

module.exports = AddIsSeenSchema;

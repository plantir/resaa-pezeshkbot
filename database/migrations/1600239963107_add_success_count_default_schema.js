'use strict';

/** @type {import('@adonisjs/lucid/src/Schema')} */
const Schema = use('Schema');

class AddSuccessCountDefaultSchema extends Schema {
  up() {
    this.table('schedule_messages', (table) => {
      // alter table
      table.integer('success_count').defaultTo(0).alter();
      table.integer('fail_count').defaultTo(0).alter();
    });
  }

  down() {
    this.table('schedule_messages', (table) => {
      // reverse alternations
    });
  }
}

module.exports = AddSuccessCountDefaultSchema;

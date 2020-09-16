'use strict';

/** @type {import('@adonisjs/lucid/src/Schema')} */
const Schema = use('Schema');

class AddImageScheduleMessageSchema extends Schema {
  up() {
    this.table('schedule_messages', (table) => {
      // alter table
      table.string('image').after('text');
      table.string('video').after('image');
    });
  }

  down() {
    this.table('schedule_messages', (table) => {
      // reverse alternations
      table.dropColumn('image');
      table.dropColumn('video');
    });
  }
}

module.exports = AddImageScheduleMessageSchema;

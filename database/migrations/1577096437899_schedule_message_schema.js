'use strict';

/** @type {import('@adonisjs/lucid/src/Schema')} */
const Schema = use('Schema');

class ScheduleMessageSchema extends Schema {
  up() {
    this.create('schedule_messages', table => {
      table.increments();
      table.string('title');
      table.text('text');
      table.datetime('send_time');
      table.integer('success_count');
      table.integer('fail_count');
      table.boolean('is_send').defaultTo(false);
      table.boolean('is_deleted').defaultTo(false);
      table.timestamps();
    });
  }

  down() {
    this.drop('schedule_messages');
  }
}

module.exports = ScheduleMessageSchema;

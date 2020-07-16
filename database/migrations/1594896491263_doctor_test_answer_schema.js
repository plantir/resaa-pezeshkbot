'use strict';

/** @type {import('@adonisjs/lucid/src/Schema')} */
const Schema = use('Schema');

class DoctorTestAnswerSchema extends Schema {
  up() {
    this.create('doctor_test_answers', (table) => {
      table.increments();
      table.integer('doctor_id');
      table.integer('tracking_code');
      table.json('answer');
      table.boolean('is_seen').defaultTo(false);
      table.boolean('is_deleted').defaultTo(false);
      table.timestamps();
    });
  }

  down() {
    this.drop('doctor_test_answers');
  }
}

module.exports = DoctorTestAnswerSchema;

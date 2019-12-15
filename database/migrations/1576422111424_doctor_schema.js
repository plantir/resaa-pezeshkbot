'use strict';

/** @type {import('@adonisjs/lucid/src/Schema')} */
const Schema = use('Schema');

class DoctorSchema extends Schema {
  up() {
    this.create('doctors', table => {
      table.increments();
      table.integer('subscriber_number');
      table.string('chat_id');
      table.string('first_name');
      table.string('last_name');
      table
        .integer('speciality_id')
        .unsigned()
        .references('id')
        .inTable('specialities');
      table.timestamps();
    });
  }

  down() {
    this.drop('doctors');
  }
}

module.exports = DoctorSchema;

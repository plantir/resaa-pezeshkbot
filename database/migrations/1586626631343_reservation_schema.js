'use strict';

/** @type {import('@adonisjs/lucid/src/Schema')} */
const Schema = use('Schema');

class ReservationSchema extends Schema {
  up() {
    this.create('reservations', (table) => {
      table.increments();
      table.integer('doctor_subscriber');
      table
        .integer('patient_id')
        .unsigned()
        .references('id')
        .inTable('patients');
      table.string('description');
      table.string('track_id').unique();
      table.datetime('start');
      table.datetime('end');
      table.enum('status', ['cancelled', 'payment_pending', 'approved']);
      table.boolean('is_deleted').defaultTo(false);
      table.timestamps();
    });
  }

  down() {
    this.drop('reservations');
  }
}

module.exports = ReservationSchema;

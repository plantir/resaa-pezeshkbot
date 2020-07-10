'use strict';

/** @type {import('@adonisjs/lucid/src/Schema')} */
const Schema = use('Schema');

class CoronaTestSchema extends Schema {
  up() {
    this.create('corona_tests', (table) => {
      table.increments();
      table.integer('charge_id');
      table.integer('doctor_id');
      table.integer('amount');
      table.string('name');
      table.string('mobile');
      table.text('address');
      table.string('phoneNumber');
      table.string('subscriberNumber');
      table.string('paymentRequestId');
      table.string('chargeRequestId');
      table
        .enum('status', ['pending', 'paid', 'canceled'])
        .defaultTo('pending');
      table.text('description');
      table.boolean('is_deleted').defaultTo(false);
      table.timestamps();
    });
  }

  down() {
    this.drop('corona_tests');
  }
}

module.exports = CoronaTestSchema;

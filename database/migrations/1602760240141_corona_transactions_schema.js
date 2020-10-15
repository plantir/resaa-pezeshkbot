'use strict';

/** @type {import('@adonisjs/lucid/src/Schema')} */
const Schema = use('Schema');

class CoronaTransactionsSchema extends Schema {
  up() {
    this.create('corona_transactions', (table) => {
      table.increments();
      table.integer('order_id').unsigned();
      table.integer('amount');
      table.json('bank_response');
      table.enum('status', ['unpaid', 'paid', 'returned']).defaultTo('unpaid');
      table.string('tracking_code');
      table.boolean('is_deleted').defaultTo(false);
      table.timestamps();
    });
  }

  down() {
    this.drop('corona_transactions');
  }
}

module.exports = CoronaTransactionsSchema;

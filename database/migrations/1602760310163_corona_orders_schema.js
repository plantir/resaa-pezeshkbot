'use strict';

/** @type {import('@adonisjs/lucid/src/Schema')} */
const Schema = use('Schema');

class CoronaOrdersSchema extends Schema {
  up() {
    this.create('corona_orders', (table) => {
      table.increments();
      table.string('user_mobile');
      table.string('user_fullname');
      table.string('user_nationalcode');
      table.string('user_address');
      table.integer('total_amount');
      table.integer('prepay_amount');
      table.json('discount');
      table
        .integer('city_id')
        .unsigned()
        .references('id')
        .inTable('corona_cities');
      table
        .integer('test_id')
        .unsigned()
        .references('id')
        .inTable('corona_tests');
      table
        .integer('transaction_id')
        .unsigned()
        .references('id')
        .inTable('corona_transactions');
      table.text('description');
      table
        .enum('status', [
          'pending',
          'in_process',
          'cordinated',
          'referred',
          'test_result_posted',
          'canceled',
        ])
        .defaultTo('pending');
      table.boolean('is_deleted').defaultTo(false);
      table.timestamps();
    });
  }

  down() {
    this.drop('corona_orders');
  }
}

module.exports = CoronaOrdersSchema;

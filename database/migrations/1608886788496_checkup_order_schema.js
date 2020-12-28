'use strict';

/** @type {import('@adonisjs/lucid/src/Schema')} */
const Schema = use('Schema');

class CheckupOrderSchema extends Schema {
  up() {
    this.create('checkup_orders', (table) => {
      table.increments();
      table.string('user_mobile');
      table.string('user_fullname');
      table.string('user_nationalcode');
      table.string('user_address');
      table.integer('total_amount');
      table.integer('prepay_amount');
      table.integer('role_discount_amount');
      table.integer('payable_amount');
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
      table.json('discount');
      table.json('selected_test');
      table.integer('count');
      table.boolean('is_called').defaultTo('false');
      table.boolean('is_negotiated').defaultTo('false');
      table.boolean('is_verified').defaultTo('false');
      table.integer('city_id').unsigned().references('id').inTable('cities');
      table
        .integer('test_id')
        .unsigned()
        .references('id')
        .inTable('checkup_tests');
      table.text('description');
      table.boolean('is_deleted').defaultTo(false);
      table.timestamps();
    });
  }

  down() {
    this.drop('checkup_orders');
  }
}

module.exports = CheckupOrderSchema;

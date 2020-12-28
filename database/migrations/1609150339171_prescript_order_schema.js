'use strict';

/** @type {import('@adonisjs/lucid/src/Schema')} */
const Schema = use('Schema');

class PrescriptOrderSchema extends Schema {
  up() {
    this.create('prescript_orders', (table) => {
      table.increments();
      table.string('guid').unique();
      table.string('user_mobile');
      table.string('user_fullname');
      table.string('user_nationalcode');
      table.string('user_address');
      table.json('images');
      table.integer('amount');
      table.integer('amount_with_insurance');
      table.integer('shipment_amount');
      table.integer('prepay_amount');
      table.integer('payable_amount');
      table
        .enum('status', [
          'pending',
          'reviewed',
          'called',
          'send_invoice',
          'reserved',
          'test_result_posted',
          'canceled',
        ])
        .defaultTo('pending');
      table.boolean('is_verified').defaultTo('false');
      table.integer('city_id').unsigned().references('id').inTable('cities');
      table
        .integer('labratory_id')
        .unsigned()
        .references('id')
        .inTable('labratories');
      table
        .integer('sampler_id')
        .unsigned()
        .references('id')
        .inTable('samplers');
      table
        .integer('transaction_id')
        .unsigned()
        .references('id')
        .inTable('transactions');
      table
        .integer('insurance_id')
        .unsigned()
        .references('id')
        .inTable('insurances');
      table.text('necessary_preparation');
      table.text('description');
      table.integer('result_time_max');
      table.integer('result_time_min');
      table.boolean('is_deleted').defaultTo(false);
      table.timestamps();
    });
  }

  down() {
    this.drop('prescript_orders');
  }
}

module.exports = PrescriptOrderSchema;

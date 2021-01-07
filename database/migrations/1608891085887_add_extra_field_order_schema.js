'use strict';

/** @type {import('@adonisjs/lucid/src/Schema')} */
const Schema = use('Schema');

class AddExtraFieldOrderSchema extends Schema {
  up() {
    this.table('checkup_orders', (table) => {
      table.string('guid').unique().after('id');
      table
        .integer('labratory_id')
        .unsigned()
        .references('id')
        .inTable('labratories')
        .after('city_id');
      table
        .integer('sampler_id')
        .unsigned()
        .references('id')
        .inTable('samplers')
        .after('city_id');
      table
        .integer('transaction_id')
        .unsigned()
        .references('id')
        .inTable('transactions')
        .after('city_id');
      table.json('selected_services').after('selected_test');
      table.integer('result_time_min').after('description');
      table.integer('result_time_max').after('description');
      // alter table
    });
  }

  down() {
    this.table('checkup_orders', (table) => {
      // reverse alternations
      table.dropForeign('labratory_id');
      table.dropForeign('sampler_id');
      table.dropForeign('transaction_id');
      table.dropColumn('labratory_id');
      table.dropColumn('sampler_id');
      table.dropColumn('transaction_id');
      table.dropColumn('guid');
      table.dropColumn('selected_services');
      table.dropColumn('result_time_min');
      table.dropColumn('result_time_max');
    });
  }
}

module.exports = AddExtraFieldOrderSchema;

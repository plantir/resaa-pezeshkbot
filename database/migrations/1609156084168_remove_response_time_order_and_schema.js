'use strict';

/** @type {import('@adonisjs/lucid/src/Schema')} */
const Schema = use('Schema');

class FixCheckupOrderAndTestsSchema extends Schema {
  up() {
    this.table('checkup_orders', (table) => {
      // alter table
      table.dropColumn('result_time_min');
      table.dropColumn('result_time_max');
    });
  }

  down() {
    this.table('checkup_orders', (table) => {
      // reverse alternations
      table.integer('result_time_min').after('description');
      table.integer('result_time_max').after('description');
    });
  }
}

module.exports = FixCheckupOrderAndTestsSchema;

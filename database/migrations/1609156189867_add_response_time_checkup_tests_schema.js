'use strict';

/** @type {import('@adonisjs/lucid/src/Schema')} */
const Schema = use('Schema');

class AddResponseTimeCheckupTestsSchema extends Schema {
  up() {
    this.table('checkup_tests', (table) => {
      // alter table
      table.integer('result_time_min').after('description');
      table.integer('result_time_max').after('description');
    });
  }

  down() {
    this.table('checkup_tests', (table) => {
      // reverse alternations
      table.dropColumn('result_time_min');
      table.dropColumn('result_time_max');
    });
  }
}

module.exports = AddResponseTimeCheckupTestsSchema;

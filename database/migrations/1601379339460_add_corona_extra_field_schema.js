'use strict';

/** @type {import('@adonisjs/lucid/src/Schema')} */
const Schema = use('Schema');

class AddCoronaExtraFieldSchema extends Schema {
  up() {
    this.table('corona_tests', (table) => {
      // alter table
      table.json('selected_test').after('id');
      table
        .integer('city_id')
        .unsigned()
        .references('id')
        .inTable('cities')
        .after('selected_test');
    });
  }

  down() {
    this.table('corona_tests', (table) => {
      // reverse alternations
      table.dropColumn('selected_test');
      table.dropColumn('city_id');
    });
  }
}

module.exports = AddCoronaExtraFieldSchema;

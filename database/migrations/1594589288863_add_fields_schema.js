'use strict';

/** @type {import('@adonisjs/lucid/src/Schema')} */
const Schema = use('Schema');

class AddFieldsSchema extends Schema {
  up() {
    this.table('corona_tests', (table) => {
      // alter table
      table.string('nationalCode').after('name');
      table.json('symptoms').after('phoneNumber');
    });
  }

  down() {
    this.table('corona_tests', (table) => {
      // reverse alternations
      table.dropColumn('nationalCode');
      table.dropColumn('symptoms');
    });
  }
}

module.exports = AddFieldsSchema;

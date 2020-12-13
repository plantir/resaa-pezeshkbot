'use strict';

/** @type {import('@adonisjs/lucid/src/Schema')} */
const Schema = use('Schema');

class AddDescTestSchema extends Schema {
  up() {
    this.table('corona_tests', (table) => {
      table.json('force_option').after('description');
      // alter table
    });
  }

  down() {
    this.table('corona_tests', (table) => {
      table.dropColumn('force_option');
      // reverse alternations
    });
  }
}

module.exports = AddDescTestSchema;

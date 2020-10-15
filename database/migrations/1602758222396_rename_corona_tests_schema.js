'use strict';

/** @type {import('@adonisjs/lucid/src/Schema')} */
const Schema = use('Schema');

class RenameCoronaTestsSchema extends Schema {
  up() {
    this.table('corona_tests', (table) => {
      table.dropForeign('city_id');
      this.renameTable('corona_tests', 'old_corona_tests');
    });
  }

  down() {
    this.renameTable('old_corona_tests', 'corona_tests');
    this.table('corona_tests', (table) => {
      table
        .integer('city_id')
        .unsigned()
        .references('id')
        .inTable('cities')
        .after('selected_test')
        .alter();
    });
  }
}

module.exports = RenameCoronaTestsSchema;

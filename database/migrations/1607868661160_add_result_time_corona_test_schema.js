'use strict';

/** @type {import('@adonisjs/lucid/src/Schema')} */
const Schema = use('Schema');

class AddResultTimeCoronaTestSchema extends Schema {
  up() {
    this.table('corona_tests', (table) => {
      // alter table
      table.integer('result_time').unsigned().after('color');
    });
  }

  down() {
    this.table('corona_tests', (table) => {
      // reverse alternations
      table.dropColumn('result_time');
    });
  }
}

module.exports = AddResultTimeCoronaTestSchema;

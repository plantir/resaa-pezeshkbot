'use strict';

/** @type {import('@adonisjs/lucid/src/Schema')} */
const Schema = use('Schema');

class AddGuidCoronaOrdersSchema extends Schema {
  up() {
    this.table('corona_orders', (table) => {
      // alter table
      table.string('guid').after('id');
    });
  }

  down() {
    this.table('corona_orders', (table) => {
      // reverse alternations
      table.dropColumn('guid');
    });
  }
}

module.exports = AddGuidCoronaOrdersSchema;

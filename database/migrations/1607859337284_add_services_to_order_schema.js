'use strict';

/** @type {import('@adonisjs/lucid/src/Schema')} */
const Schema = use('Schema');

class AddServicesToOrderSchema extends Schema {
  up() {
    this.table('corona_orders', (table) => {
      table.json('selected_services').after('selected_test');
      // alter table
    });
  }

  down() {
    this.table('corona_orders', (table) => {
      table.dropColumn('selected_services');
      // reverse alternations
    });
  }
}

module.exports = AddServicesToOrderSchema;

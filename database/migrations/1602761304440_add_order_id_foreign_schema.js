'use strict';

/** @type {import('@adonisjs/lucid/src/Schema')} */
const Schema = use('Schema');

class AddOrderIdForeignSchema extends Schema {
  up() {
    this.table('corona_transactions', (table) => {
      // alter table
      table
        .integer('order_id')
        .unsigned()
        .references('id')
        .inTable('corona_orders')
        .alter();
    });
  }

  down() {
    this.table('corona_transactions', (table) => {
      // reverse alternations
      table.dropForeign('order_id');
    });
  }
}

module.exports = AddOrderIdForeignSchema;

'use strict';

/** @type {import('@adonisjs/lucid/src/Schema')} */
const Schema = use('Schema');

class AddIsCheckedFieldSchema extends Schema {
  up() {
    this.table('corona_orders', (table) => {
      // alter table
      table.boolean('is_checked').defaultTo('false');
    });
  }

  down() {
    this.table('corona_orders', (table) => {
      // reverse alternations
      table.dropColumn('is_checked');
    });
  }
}

module.exports = AddIsCheckedFieldSchema;

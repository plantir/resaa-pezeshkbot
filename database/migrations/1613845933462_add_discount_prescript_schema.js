'use strict';

/** @type {import('@adonisjs/lucid/src/Schema')} */
const Schema = use('Schema');

class AddDiscountPrescriptSchema extends Schema {
  up() {
    this.table('prescript_orders', (table) => {
      // alter table
      table.json('discount').after('status');
    });
  }

  down() {
    this.table('prescript_orders', (table) => {
      // reverse alternations
      table.dropColumn('status');
    });
  }
}

module.exports = AddDiscountPrescriptSchema;

'use strict';

/** @type {import('@adonisjs/lucid/src/Schema')} */
const Schema = use('Schema');

class AddPrescriptOrderFieldsSchema extends Schema {
  up() {
    this.table('prescript_orders', (table) => {
      table.text('admin_note').after('description');
      table.text('sample_type').after('description');
      table.text('sample_time').after('description');
      // alter table
    });
  }

  down() {
    this.table('prescript_orders', (table) => {
      // reverse alternations
      table.dropColumn('admin_note');
      table.dropColumn('sample_type');
      table.dropColumn('sample_time');
    });
  }
}

module.exports = AddPrescriptOrderFieldsSchema;

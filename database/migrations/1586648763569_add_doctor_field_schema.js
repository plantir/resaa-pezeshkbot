'use strict';

/** @type {import('@adonisjs/lucid/src/Schema')} */
const Schema = use('Schema');

class AddDoctorFieldSchema extends Schema {
  up() {
    this.table('doctors', (table) => {
      // alter table
      table.integer('work_experience').after('description');
      table.float('price_per_minute').after('description');
      table.integer('culture_access').after('description');
      table.integer('speciaity_access').after('description');
    });
  }

  down() {
    this.table('doctors', (table) => {
      // reverse alternations
      table.dropColumn('work_experience');
      table.dropColumn('price_per_minute');
      table.dropColumn('culture_access');
      table.dropColumn('speciaity_access');
    });
  }
}

module.exports = AddDoctorFieldSchema;

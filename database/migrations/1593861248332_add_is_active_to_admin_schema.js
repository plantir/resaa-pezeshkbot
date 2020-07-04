'use strict';

/** @type {import('@adonisjs/lucid/src/Schema')} */
const Schema = use('Schema');

class AddIsActiveToAdminSchema extends Schema {
  up() {
    this.table('admins', (table) => {
      // alter table
      table.boolean('is_active').after('password').defaultTo(false);
    });
  }

  down() {
    this.table('admins', (table) => {
      table.dropColumn('is_active');
      // reverse alternations
    });
  }
}

module.exports = AddIsActiveToAdminSchema;

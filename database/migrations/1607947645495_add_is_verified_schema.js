'use strict'

/** @type {import('@adonisjs/lucid/src/Schema')} */
const Schema = use('Schema')

class AddIsVerifiedSchema extends Schema {
  up() {
    this.table('corona_orders', (table) => {
      // alter table
      table.boolean('is_verified').defaultTo('false').after('is_fast');
    });
  }

  down() {
    this.table('corona_orders', (table) => {
      // reverse alternations
      table.dropColumn('is_verified');
    });
  }
}

module.exports = AddIsVerifiedSchema

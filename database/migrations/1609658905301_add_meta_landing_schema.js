'use strict';

/** @type {import('@adonisjs/lucid/src/Schema')} */
const Schema = use('Schema');

class AddMetaLandingSchema extends Schema {
  up() {
    this.table('resaa_landings', (table) => {
      // alter table
      table.json('meta').after('name');
    });
  }

  down() {
    this.table('resaa_landings', (table) => {
      // reverse alternations
      table.dropColumn('meta');
    });
  }
}

module.exports = AddMetaLandingSchema;

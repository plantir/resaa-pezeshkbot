'use strict';

/** @type {import('@adonisjs/lucid/src/Schema')} */
const Schema = use('Schema');

class ChangeCheckupLandingsSchema extends Schema {
  up() {
    this.table('checkup_landings', (table) => {
      // alter table
      table.dropColumn('seo_title');
      table.dropColumn('seo_description');
      table.json('meta').after('title');
    });
  }

  down() {
    this.table('checkup_landings', (table) => {
      // reverse alternations
      table.dropColumn('meta');
      table.string('seo_title');
      table.text('seo_description');
    });
  }
}

module.exports = ChangeCheckupLandingsSchema;

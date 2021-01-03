'use strict';

/** @type {import('@adonisjs/lucid/src/Schema')} */
const Schema = use('Schema');

class AddLandingColorSchema extends Schema {
  up() {
    this.table('checkup_landings', (table) => {
      // alter table
      table.string('color').after('image');
    });
  }

  down() {
    this.table('checkup_landings', (table) => {
      // reverse alternations
      table.dropColumn('color');
    });
  }
}

module.exports = AddLandingColorSchema;

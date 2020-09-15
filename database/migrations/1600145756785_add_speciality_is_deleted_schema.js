'use strict';

/** @type {import('@adonisjs/lucid/src/Schema')} */
const Schema = use('Schema');

class AddSpecialityIsDeletedSchema extends Schema {
  up() {
    this.table('specialities', (table) => {
      // alter table
      table.boolean('is_deleted').after('iconPath').defaultTo(false);
      table.timestamps();
    });
  }

  down() {
    this.table('specialities', (table) => {
      // reverse alternations
      table.dropColumn('is_deleted');
    });
  }
}

module.exports = AddSpecialityIsDeletedSchema;

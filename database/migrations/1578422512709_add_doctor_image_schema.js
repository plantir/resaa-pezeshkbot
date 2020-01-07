'use strict';

/** @type {import('@adonisjs/lucid/src/Schema')} */
const Schema = use('Schema');

class AddDoctorImageSchema extends Schema {
  up() {
    this.table('doctors', table => {
      table.string('image').after('speciality_id');
      table.text('description').after('image');
      // alter table
    });
  }

  down() {
    this.table('doctors', table => {
      // reverse alternations
      table.dropColumn('image');
      table.dropColumn('description');
    });
  }
}

module.exports = AddDoctorImageSchema;

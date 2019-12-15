'use strict';

/** @type {import('@adonisjs/lucid/src/Schema')} */
const Schema = use('Schema');

class SpecialitySchema extends Schema {
  up() {
    this.create('specialities', table => {
      table.increments();
      table.string('title');
      table.string('description');
      table.string('iconPath');
      // table.timestamps()
    });
  }

  down() {
    this.drop('specialities');
  }
}

module.exports = SpecialitySchema;

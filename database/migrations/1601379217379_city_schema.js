'use strict';

/** @type {import('@adonisjs/lucid/src/Schema')} */
const Schema = use('Schema');

class CitySchema extends Schema {
  up() {
    this.create('cities', (table) => {
      table.increments();
      table.string('name');
      table.json('testsItems');
      table.boolean('is_deleted').defaultTo(false);
      table.timestamps();
    });
  }

  down() {
    this.drop('cities');
  }
}

module.exports = CitySchema;

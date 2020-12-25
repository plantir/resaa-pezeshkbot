'use strict';

/** @type {import('@adonisjs/lucid/src/Schema')} */
const Schema = use('Schema');

class DropCitiesSchema extends Schema {
  up() {
    this.rename('cities', 'corona_old_cities');
  }

  down() {
    this.rename('corona_old_cities', 'cities');
  }
}

module.exports = DropCitiesSchema;

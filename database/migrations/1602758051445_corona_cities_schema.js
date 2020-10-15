'use strict';

/** @type {import('@adonisjs/lucid/src/Schema')} */
const Schema = use('Schema');

class CoronaCitiesSchema extends Schema {
  up() {
    this.create('corona_cities', (table) => {
      table.increments();
      table.string('name');
      table.integer('sort_order').defaultTo(0);
      table.boolean('is_deleted').defaultTo(false);
      table.timestamps();
    });
  }

  down() {
    this.drop('corona_cities');
  }
}

module.exports = CoronaCitiesSchema;

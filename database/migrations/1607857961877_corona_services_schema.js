'use strict';

/** @type {import('@adonisjs/lucid/src/Schema')} */
const Schema = use('Schema');

class CoronaServicesSchema extends Schema {
  up() {
    this.create('corona_services', (table) => {
      table.increments();
      table.string('title');
      table.string('description');
      table.integer('price').unsigned();
      table.boolean('is_deleted').defaultTo(false);
      table.timestamps();
    });
  }

  down() {
    this.drop('corona_services');
  }
}

module.exports = CoronaServicesSchema;

'use strict';

/** @type {import('@adonisjs/lucid/src/Schema')} */
const Schema = use('Schema');

class CoronaTestsSchema extends Schema {
  up() {
    this.create('corona_tests', (table) => {
      table.increments();
      table
        .integer('city_id')
        .unsigned()
        .references('id')
        .inTable('corona_cities');
      table.string('name');
      table.integer('sort_order').unsigned().defaultTo(0);
      table.integer('total_amount');
      table.integer('prepay_amount');
      table.string('color');
      table.text('description');
      table.json('discount_roles');
      table.boolean('is_deleted').defaultTo(false);
      table.timestamps();
    });
  }

  down() {
    this.drop('corona_tests');
  }
}

module.exports = CoronaTestsSchema;

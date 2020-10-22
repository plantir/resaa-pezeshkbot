'use strict';

/** @type {import('@adonisjs/lucid/src/Schema')} */
const Schema = use('Schema');

class CoronaDiscountSchema extends Schema {
  up() {
    this.create('corona_discounts', (table) => {
      table.increments();
      table.string('name');
      table.string('code');
      table.integer('amount');
      table.boolean('is_deleted').defaultTo(false);
      table.timestamps();
    });
  }

  down() {
    this.drop('corona_discounts');
  }
}

module.exports = CoronaDiscountSchema;

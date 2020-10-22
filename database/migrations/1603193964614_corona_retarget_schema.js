'use strict';

/** @type {import('@adonisjs/lucid/src/Schema')} */
const Schema = use('Schema');

class CoronaRetargetSchema extends Schema {
  up() {
    this.create('corona_retargets', (table) => {
      table.increments();
      table.boolean('is_active');
      table.integer('minute');
      table
        .integer('discount_id')
        .unsigned()
        .references('id')
        .inTable('corona_discounts');
      table.timestamps();
    });
  }

  down() {
    this.drop('corona_retargets');
  }
}

module.exports = CoronaRetargetSchema;

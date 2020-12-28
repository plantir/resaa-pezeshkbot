'use strict';

/** @type {import('@adonisjs/lucid/src/Schema')} */
const Schema = use('Schema');

class PrescriptInsuranceSchema extends Schema {
  up() {
    this.create('insurances', (table) => {
      table.increments();
      table.string('name');
      table.integer('sort_order').unsigned().defaultTo(0);
      table.boolean('is_deleted').defaultTo(false);
      table.timestamps();
    });
  }

  down() {
    this.drop('insurances');
  }
}

module.exports = PrescriptInsuranceSchema;

'use strict';

/** @type {import('@adonisjs/lucid/src/Schema')} */
const Schema = use('Schema');

class SamplerSchema extends Schema {
  up() {
    this.create('corona_samplers', (table) => {
      table.increments();
      table.string('name');
      table.boolean('is_deleted').defaultTo(false);
      table.timestamps();
    });
  }

  down() {
    this.drop('corona_samplers');
  }
}

module.exports = SamplerSchema;

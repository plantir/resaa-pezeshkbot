'use strict';

/** @type {import('@adonisjs/lucid/src/Schema')} */
const Schema = use('Schema');

class AddSmaplerAndLabtatoryCoronaOrderSchema extends Schema {
  up() {
    this.table('corona_orders', (table) => {
      table
        .integer('labratory_id')
        .unsigned()
        .references('id')
        .inTable('corona_labratories');
      table
        .integer('sampler_id')
        .unsigned()
        .references('id')
        .inTable('corona_samplers');
      // alter table
    });
  }

  down() {
    this.table('corona_orders', (table) => {
      // reverse alternations
      table.dropForeign('labratory_id');
      table.dropForeign('sampler_id');
      table.dropColumn('labratory_id');
      table.dropColumn('sampler_id');
    });
  }
}

module.exports = AddSmaplerAndLabtatoryCoronaOrderSchema;

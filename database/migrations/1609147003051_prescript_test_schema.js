'use strict';

/** @type {import('@adonisjs/lucid/src/Schema')} */
const Schema = use('Schema');

class PrescriptTestSchema extends Schema {
  up() {
    this.create('prescript_tests', (table) => {
      table.increments();
      table.string('name');
      table.integer('amount');
      table.integer('sort_order').unsigned().defaultTo(0);
      table.boolean('is_deleted').defaultTo(false);
      table.timestamps();
    });
  }

  down() {
    this.drop('prescript_tests');
  }
}

module.exports = PrescriptTestSchema;

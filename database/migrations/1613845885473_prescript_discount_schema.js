'use strict';

/** @type {import('@adonisjs/lucid/src/Schema')} */
const Schema = use('Schema');

class PrescriptDiscountSchema extends Schema {
  up() {
    this.create('prescript_discounts', (table) => {
      table.increments();
      table.string('name');
      table.string('code');
      table.integer('amount');
      table.boolean('is_deleted').defaultTo(false);
      table.timestamps();
    });
  }

  down() {
    this.drop('prescript_discounts');
  }
}

module.exports = PrescriptDiscountSchema;

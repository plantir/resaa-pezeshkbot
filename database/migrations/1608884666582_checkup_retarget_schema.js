'use strict';

/** @type {import('@adonisjs/lucid/src/Schema')} */
const Schema = use('Schema');

class CheckupRetargetSchema extends Schema {
  up() {
    this.create('checkup_retargets', (table) => {
      table.increments();
      table.boolean('is_active');
      table.integer('minute');
      table
        .integer('discount_id')
        .unsigned()
        .references('id')
        .inTable('checkup_discounts');
      table.timestamps();
    });
  }

  down() {
    this.drop('checkup_retargets');
  }
}

module.exports = CheckupRetargetSchema;

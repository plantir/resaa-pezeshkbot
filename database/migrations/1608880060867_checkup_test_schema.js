'use strict';

/** @type {import('@adonisjs/lucid/src/Schema')} */
const Schema = use('Schema');

class CheckupTestSchema extends Schema {
  up() {
    this.create('checkup_tests', (table) => {
      table.increments();
      table.string('name');
      table.integer('city_id').unsigned().references('id').inTable('cities');
      table
        .integer('landing_id')
        .unsigned()
        .references('id')
        .inTable('checkup_landings');
      table.integer('sort_order').unsigned().defaultTo(0);
      table.integer('total_amount');
      table.integer('prepay_amount');
      table.string('color');
      table.string('image');
      table.json('description');
      table.json('services');
      table.json('discount_roles');
      table.boolean('is_deleted').defaultTo(false);
      table.timestamps();
    });
  }

  down() {
    this.drop('checkup_tests');
  }
}

module.exports = CheckupTestSchema;

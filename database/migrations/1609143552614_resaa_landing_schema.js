'use strict';

/** @type {import('@adonisjs/lucid/src/Schema')} */
const Schema = use('Schema');

class ResaaLandingSchema extends Schema {
  up() {
    this.create('resaa_landings', (table) => {
      table.increments();
      table.string('slug').unique();
      table.string('name');
      table.string('first_ford_title');
      table.text('first_ford_description');
      table.json('faqs');
      table.json('reviews');
      table.boolean('is_deleted').defaultTo(false);
      table.timestamps();
    });
  }

  down() {
    this.drop('resaa_landings');
  }
}

module.exports = ResaaLandingSchema;

'use strict';

/** @type {import('@adonisjs/lucid/src/Schema')} */
const Schema = use('Schema');

class CheckupLandingSchema extends Schema {
  up() {
    this.create('checkup_landings', (table) => {
      table.increments();
      table.string('title');
      table.text('description');
      table.string('image');
      table.json('faq');
      table.json('conditions');
      table.text('components');
      table.string('seo_title');
      table.text('seo_description');
      table.boolean('is_deleted').default(false);
      table.timestamps();
    });
  }

  down() {
    this.drop('checkup_landings');
  }
}

module.exports = CheckupLandingSchema;

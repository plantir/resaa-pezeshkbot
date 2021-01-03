'use strict';

/** @type {import('@adonisjs/lucid/src/Schema')} */
const Schema = use('Schema');
const Database = use('Database');
class Add3LandingsSchema extends Schema {
  async up() {
    let pages = [
      {
        slug: 'test-at-home',
        name: 'آزمایش در منزل',
        first_ford_title: 'test-at-home',
        first_ford_description: 'test-at-home',
      },
      {
        slug: 'test-at-home-checkup-tests',
        name: 'آزمایش بدون نسخه',
        first_ford_title: 'test-at-home-checkup-tests',
        first_ford_description: 'test-at-home-checkup-tests',
      },
      {
        slug: 'test-at-home-test-with-prescription',
        name: 'آزمایش با نسخه',
        first_ford_title: 'test-at-home-test-with-prescription',
        first_ford_description: 'test-at-home-test-with-prescription',
      },
    ];
    await Database.table('resaa_landings').insert(pages);
  }

  async down() {
    Database.truncate('resaa_landings')
  }
}

module.exports = Add3LandingsSchema;

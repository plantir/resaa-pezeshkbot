'use strict';

/** @type {import('@adonisjs/lucid/src/Schema')} */
const Schema = use('Schema');

class ApplicationSchema extends Schema {
  up() {
    this.create('applications', (table) => {
      table.increments();
      table.enum('type', ['default', 'force', 'urgent', 'notify', 'internal']);
      table.string('version');
      table.string('url');
      table.boolean('is_deleted').defaultTo(false);
      table.timestamps();
    });
  }

  down() {
    this.drop('applications');
  }
}

module.exports = ApplicationSchema;

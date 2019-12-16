'use strict';

/** @type {import('@adonisjs/lucid/src/Schema')} */
const Schema = use('Schema');

class AdminSchema extends Schema {
  up() {
    this.create('admins', table => {
      table.increments();
      table
        .string('username', 80)
        .notNullable()
        .unique();
      table.string('password', 60).notNullable();
      table.boolean('is_deleted').defaultTo(false);
      table.timestamps();
    });
  }

  down() {
    this.drop('admins');
  }
}

module.exports = AdminSchema;

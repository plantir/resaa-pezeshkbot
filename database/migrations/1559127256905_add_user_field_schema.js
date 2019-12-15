'use strict';

/** @type {import('@adonisjs/lucid/src/Schema')} */
const Schema = use('Schema');

class AddUserFieldSchema extends Schema {
  up() {
    this.table('users', table => {
      // alter table
      table.string('email').after('password');
    });
  }

  down() {
    this.table('users', table => {
      // reverse alternations
    });
  }
}

module.exports = AddUserFieldSchema;

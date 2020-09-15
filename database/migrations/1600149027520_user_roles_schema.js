'use strict';

/** @type {import('@adonisjs/lucid/src/Schema')} */
const Schema = use('Schema');

class UserRolesSchema extends Schema {
  up() {
    this.create('admin_roles', (table) => {
      table.increments();
      table.integer('admin_id').unsigned().references('id').inTable('admins');
      table.integer('role_id').unsigned().references('id').inTable('roles');
      table.timestamps();
    });
  }

  down() {
    this.drop('admin_roles');
  }
}

module.exports = UserRolesSchema;

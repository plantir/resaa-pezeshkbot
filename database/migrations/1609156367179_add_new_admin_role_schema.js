'use strict';

/** @type {import('@adonisjs/lucid/src/Schema')} */
const Schema = use('Schema');
const Database = use('Database');
class AddNewAdminRoleSchema extends Schema {
  async up() {
    await Database.table('roles').insert({ name: 'experiment_admin' });
  }

  async down() {
    await Database.table('roles').where({ name: 'experiment_admin' }).delete();
  }
}

module.exports = AddNewAdminRoleSchema;

'use strict';

/** @type {import('@adonisjs/lucid/src/Schema')} */
const Schema = use('Schema');
const Database = use('Database');
const new_role = {
  name: 'crawl_admin',
};
class AddCrulerRoleSchema extends Schema {
  async up() {
    await Database.from('roles').insert(new_role);
  }

  async down() {
    await Database.from('roles').where('name', new_role.name).delete();
  }
}

module.exports = AddCrulerRoleSchema;

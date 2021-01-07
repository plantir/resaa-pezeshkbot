'use strict';

/** @type {import('@adonisjs/lucid/src/Schema')} */
const Schema = use('Schema');
const Database = use('Database');
class AddDefaultRetargetSchema extends Schema {
  async up() {
    await Database.table('checkup_retargets').insert({
      id: 1,
      is_active: false,
      minute: 0,
      discount_id: null,
    });
  }

  async down() {
    await Database.table('checkup_retargets').where({ id: 1 }).delete();
  }
}

module.exports = AddDefaultRetargetSchema;

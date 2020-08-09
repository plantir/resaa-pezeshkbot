'use strict';

/** @type {import('@adonisjs/lucid/src/Schema')} */
const Schema = use('Schema');
const Database = use('Database');
class ChangeEnumSchema extends Schema {
  async up() {
    await Database.raw(`ALTER TABLE \`resaa_pezeshk_bot_db\`.\`applications\` 
    CHANGE COLUMN \`type\` \`type\` ENUM('default', 'urgent', 'notify', 'internal') NULL DEFAULT NULL ;
    `);
  }

  down() {
    this.drop('change_enums');
  }
}

module.exports = ChangeEnumSchema;

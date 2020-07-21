'use strict';

/** @type {import('@adonisjs/lucid/src/Schema')} */
const Schema = use('Schema');
const Database = use('Database');
class AddStatusSchema extends Schema {
  async up() {
    await Database.raw(`ALTER TABLE \`resaa_pezeshk_bot_db\`.\`corona_tests\` 
    CHANGE COLUMN \`status\` \`status\` ENUM('pending', 'in_process', 'cordinated', 'referred', 'test_result_posted', 'canceled') NULL DEFAULT 'pending' ;
    `);
  }

  async down() {
    await Database.raw(`ALTER TABLE \`resaa_pezeshk_bot_db\`.\`corona_tests\` 
    CHANGE COLUMN \`status\` \`status\` ENUM('pending', 'cordinated', 'referred', 'test_result_posted', 'canceled') NULL DEFAULT 'pending' ;
    `);
  }
}

module.exports = AddStatusSchema;

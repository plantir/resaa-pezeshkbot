'use strict';

/** @type {import('@adonisjs/lucid/src/Schema')} */
const Schema = use('Schema');
const Database = use('Database');
class AddPaymentStatusSchema extends Schema {
  async up() {
    await Database.raw(`
    ALTER TABLE \`resaa_pezeshk_bot_db\`.\`corona_tests\` 
    CHANGE COLUMN \`payment_status\` \`payment_status\` ENUM('pending', 'unpaid', 'paid', 'returned') NULL DEFAULT 'unpaid' ;
    `);
  }

  async down() {
    await Database.raw(`
    ALTER TABLE \`resaa_pezeshk_bot_db\`.\`corona_tests\` 
    CHANGE COLUMN \`payment_status\` \`payment_status\` ENUM('pending', 'unpaid', 'paid') NULL DEFAULT 'unpaid' ;
    `);
  }
}

module.exports = AddPaymentStatusSchema;

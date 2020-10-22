'use strict';

/** @type {import('@adonisjs/lucid/src/Schema')} */
const Schema = use('Schema');
const Database = use('Database');
class AddTransactionStatusSchema extends Schema {
  async up() {
    // alter table
    await Database.raw(`
         ALTER TABLE \`corona_transactions\`
         CHANGE COLUMN \`status\` \`status\` ENUM('unpaid', 'paid', 'negotiated', 'returned') NULL DEFAULT 'unpaid' ;
         `);
    await Database.raw(`
    ALTER TABLE \`old_corona_tests\`
    CHANGE COLUMN \`payment_status\` \`payment_status\` ENUM('unpaid', 'paid', 'negotiated', 'returned') NULL DEFAULT 'unpaid' ;
    `);
  }

  async down() {
    // reverse alternations
    await Database.raw(`
      ALTER TABLE \`corona_transactions\`
      CHANGE COLUMN \`status\` \`status\` ENUM('unpaid', 'paid', 'returned') NULL DEFAULT 'unpaid' ;
      `);
    await Database.raw(`
    ALTER TABLE \`old_corona_tests\`
    CHANGE COLUMN \`payment_status\` \`payment_status\` ENUM('unpaid', 'paid', 'returned') NULL DEFAULT 'unpaid' ;
    `);
  }
}

module.exports = AddTransactionStatusSchema;

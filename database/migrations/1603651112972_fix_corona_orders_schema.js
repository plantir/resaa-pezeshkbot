'use strict';

/** @type {import('@adonisjs/lucid/src/Schema')} */
const Schema = use('Schema');
const Database = use('Database');

class FixCoronaOrdersSchema extends Schema {
  async up() {
    await Database.raw(`
    ALTER TABLE \`corona_transactions\`
    CHANGE COLUMN \`status\` \`status\` ENUM('unpaid', 'paid', 'returned') NULL DEFAULT 'unpaid' ;
    `);
    await Database.raw(`
  ALTER TABLE \`old_corona_tests\`
  CHANGE COLUMN \`payment_status\` \`payment_status\` ENUM('unpaid', 'paid', 'returned') NULL DEFAULT 'unpaid' ;
  `);
    this.table('corona_orders', (table) => {
      table.dropColumn('is_checked');
      table.boolean('is_negotiated').defaultTo(false).after('status');
      table.boolean('is_called').defaultTo(false).after('status');
    });
  }

  async down() {
    this.table('corona_orders', (table) => {
      table.boolean('is_checked');
      table.dropColumn('is_negotiated');
      table.dropColumn('is_called');
    });
    await Database.raw(`
         ALTER TABLE \`corona_transactions\`
         CHANGE COLUMN \`status\` \`status\` ENUM('unpaid', 'paid', 'negotiated', 'returned') NULL DEFAULT 'unpaid' ;
         `);
    await Database.raw(`
    ALTER TABLE \`old_corona_tests\`
    CHANGE COLUMN \`payment_status\` \`payment_status\` ENUM('unpaid', 'paid', 'negotiated', 'returned') NULL DEFAULT 'unpaid' ;
    `);
  }
}

module.exports = FixCoronaOrdersSchema;

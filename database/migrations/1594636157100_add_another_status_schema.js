'use strict';

/** @type {import('@adonisjs/lucid/src/Schema')} */
const Schema = use('Schema');
const Database = use('Database');
const CoronaTest = use('App/Models/CoronaTest');
class AddAnotherStatusSchema extends Schema {
  async up() {
    await Database.raw(`ALTER TABLE \`corona_tests\` 
    CHANGE COLUMN \`status\` \`payment_status\` ENUM('pending','unpaid', 'paid') NULL DEFAULT 'unpaid' ;
    `);
    await CoronaTest.query()
      .where({ payment_status: 'pending' })
      .update({ payment_status: 'unpaid' });
    await Database.raw(`ALTER TABLE \`corona_tests\` 
    CHANGE COLUMN \`payment_status\` \`payment_status\` ENUM('unpaid', 'paid') NULL DEFAULT 'unpaid' ;
    `);
    this.table('corona_tests', (table) => {
      // alter table
      // table.renameColumn('status', 'payment_status');
      table
        .enum('status', [
          'pending',
          'cordinated',
          'referred',
          'test_result_posted',
          'canceled',
        ])
        .defaultTo('pending')
        .after('payment_status');
    });
  }

  down() {
    this.table('corona_tests', (table) => {
      // reverse alternations
      table.dropColumn('status');
      table.renameColumn('payment_status', 'status');
    });
  }
}

module.exports = AddAnotherStatusSchema;

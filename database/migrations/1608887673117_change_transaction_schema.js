'use strict';

/** @type {import('@adonisjs/lucid/src/Schema')} */
const Schema = use('Schema');

class ChangeTransactionSchema extends Schema {
  up() {
    this.renameTable('corona_transactions', 'transactions');
  }

  down() {
    this.renameTable('transactions', 'corona_transactions');
  }
}

module.exports = ChangeTransactionSchema;

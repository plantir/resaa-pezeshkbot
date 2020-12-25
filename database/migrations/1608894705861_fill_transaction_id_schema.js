'use strict';

/** @type {import('@adonisjs/lucid/src/Schema')} */
const Schema = use('Schema');
const Database = use('Database');
class FillTransactionIdSchema extends Schema {
  async up() {
    let orders = await Database.table('corona_orders');
    for (const order of orders) {
      let transaction = await Database.table('transactions')
        .where({
          order_id: order.id,
        })
        .first();
      if (transaction) {
        await Database.table('corona_orders')
          .where({ id: order.id })
          .update({ transaction_id: transaction.id });
      }
    }
  }

  async down() {}
}

module.exports = FillTransactionIdSchema;

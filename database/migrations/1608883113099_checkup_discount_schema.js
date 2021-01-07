'use strict'

/** @type {import('@adonisjs/lucid/src/Schema')} */
const Schema = use('Schema')

class CheckupDiscountSchema extends Schema {
  up () {
    this.create('checkup_discounts', (table) => {
      table.increments()
      table.string('name');
      table.string('code');
      table.integer('amount');
      table.boolean('is_deleted').defaultTo(false);
      table.timestamps()
    })
  }

  down () {
    this.drop('checkup_discounts')
  }
}

module.exports = CheckupDiscountSchema

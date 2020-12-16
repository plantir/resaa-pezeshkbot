'use strict'

/** @type {import('@adonisjs/lucid/src/Schema')} */
const Schema = use('Schema')

class AddServicesToTestSchema extends Schema {
  up () {
    this.table('corona_tests', (table) => {
      table.json('services').after('fast_option')
      table.integer('shipment_amount').unsigned().after('total_amount')
      // alter table
    })
  }

  down () {
    this.table('corona_tests', (table) => {
      // reverse alternations
      table.dropColumn('services')
      table.dropColumn('shipment_amount')
    })
  }
}

module.exports = AddServicesToTestSchema

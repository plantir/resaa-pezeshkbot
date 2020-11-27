'use strict'

/** @type {import('@adonisjs/lucid/src/Schema')} */
const Schema = use('Schema')

class LabratorySchema extends Schema {
  up () {
    this.create('corona_labratories', (table) => {
      table.increments()
      table.string('name')
      table.boolean('is_deleted').defaultTo(false);
      table.timestamps()
    })
  }

  down () {
    this.drop('corona_labratories')
  }
}

module.exports = LabratorySchema

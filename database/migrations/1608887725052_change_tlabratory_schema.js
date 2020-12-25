'use strict'

/** @type {import('@adonisjs/lucid/src/Schema')} */
const Schema = use('Schema')

class ChangeTlabratorySchema extends Schema {
  up () {
    this.renameTable('corona_labratories', 'labratories');
  }

  down () {
    this.renameTable('labratories', 'corona_labratories');
  }
}

module.exports = ChangeTlabratorySchema

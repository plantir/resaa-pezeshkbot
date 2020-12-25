'use strict';

/** @type {import('@adonisjs/lucid/src/Schema')} */
const Schema = use('Schema');

class ChangeSamplerSchema extends Schema {
  up() {
    this.renameTable('corona_samplers', 'samplers');
  }

  down() {
    this.renameTable('samplers', 'corona_samplers');
  }
}

module.exports = ChangeSamplerSchema;

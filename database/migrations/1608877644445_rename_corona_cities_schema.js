'use strict';

/** @type {import('@adonisjs/lucid/src/Schema')} */
const Schema = use('Schema');

class RenameCoronaCitiesSchema extends Schema {
  up() {
    this.renameTable('corona_cities', 'cities');
  }

  down() {
    this.renameTable('cities', 'corona_cities');
  }
}

module.exports = RenameCoronaCitiesSchema;

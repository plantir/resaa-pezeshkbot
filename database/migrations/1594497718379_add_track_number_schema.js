'use strict';

/** @type {import('@adonisjs/lucid/src/Schema')} */
const Schema = use('Schema');

class AddTrackNumberSchema extends Schema {
  up() {
    this.table('corona_tests', (table) => {
      // alter table
      table.string('trackingNumber').after('chargeRequestId');
      table.string('trackingImage').after('trackingNumber');
    });
  }

  down() {
    this.table('corona_tests', (table) => {
      // reverse alternations
      table.dropColumn('trackingNumber');
      table.dropColumn('trackingImage');
    });
  }
}

module.exports = AddTrackNumberSchema;

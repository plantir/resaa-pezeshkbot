'use strict';

/** @type {import('@adonisjs/lucid/src/Schema')} */
const Schema = use('Schema');

class ConvertedDoctorSchema extends Schema {
  up() {
    this.create('converted_doctors', (table) => {
      table.increments();
      table
        .integer('specialty_id')
        .unsigned()
        .references('id')
        .inTable('specialities');
      table.string('title');
      table.string('firstName');
      table.string('lastName');
      table.string('medicalCouncilNumber');
      table.text('scientificAwards');
      table.json('addresses');
      table.text('biography');
      table.string('commentCount');
      table.text('communityEnrollments');
      table.text('expertise');
      table.string('hospitals');
      table.string('image');
      table.string('instagram');
      table.string('insurances');
      table.text('languages');
      table.json('pictureGallery');
      table.text('scientificBackgrounds');
      table.text('services');
      table.string('source');
      table.text('startPractiseDate');
      table.string('state');
      table.string('telegram');
      table.string('url');
      table.string('viewCount');
      table.text('description');
      table.boolean('is_deleted').defaultTo(false);
      table.timestamps();
    });
  }

  down() {
    this.drop('converted_doctors');
  }
}

module.exports = ConvertedDoctorSchema;

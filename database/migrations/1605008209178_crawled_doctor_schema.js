'use strict';

/** @type {import('@adonisjs/lucid/src/Schema')} */
const Schema = use('Schema');

class CrawledDoctorSchema extends Schema {
  up() {
    this.create('crawled_doctors', (table) => {
      table.increments();
      table
        .integer('converted_doctor_id')
        .unsigned()
        .references('id')
        .inTable('converted_doctors');
      table
        .integer('specialty_id')
        .unsigned()
        .references('id')
        .inTable('specialities');
      table.text('firstName');
      table.text('lastName');
      table.text('medicalCouncilNumber');
      table.text('scientificAwards');
      table.json('addresses');
      table.text('biography');
      table.text('commentCount');
      table.text('communityEnrollments');
      table.text('expertise');
      table.text('hospitals');
      table.text('image');
      table.text('instagram');
      table.text('insurances');
      table.text('languages');
      table.json('pictureGallery');
      table.text('scientificBackgrounds');
      table.text('services');
      table.text('source');
      table.text('startPractiseDate');
      table.text('state');
      table.text('telegram');
      table.text('url');
      table.text('viewCount');
      table.text('description');
      table.boolean('is_deleted').defaultTo(false);
      table.timestamps();
    });
  }

  down() {
    this.drop('crawled_doctors');
  }
}

module.exports = CrawledDoctorSchema;

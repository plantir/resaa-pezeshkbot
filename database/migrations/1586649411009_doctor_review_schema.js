'use strict';

/** @type {import('@adonisjs/lucid/src/Schema')} */
const Schema = use('Schema');

class DockerCommentSchema extends Schema {
  up() {
    this.create('doctor_reviews', (table) => {
      table.increments();
      table.integer('doctor_subscriber');
      table.string('owner_name');
      table.text('text');
      table.date('review_at');
      table.boolean('is_deleted').defaultTo(false);
      table.timestamps();
    });
  }

  down() {
    this.drop('doctor_reviews');
  }
}

module.exports = DockerCommentSchema;

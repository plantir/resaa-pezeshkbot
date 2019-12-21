'use strict';

/** @type {import('@adonisjs/lucid/src/Schema')} */
const Schema = use('Schema');

class DoctorAnswerSchema extends Schema {
  up() {
    this.create('doctor_answers', table => {
      table.increments();
      table
        .integer('doctor_id')
        .unsigned()
        .references('id')
        .inTable('doctors');
      table
        .integer('question_id')
        .unsigned()
        .references('id')
        .inTable('questions');
      table.text('answer');
      table.integer('message_id').unsigned();
      table.boolean('is_expired').defaultTo(false);
      table.boolean('is_deleted').defaultTo(false);
      table.timestamps();
    });
  }

  down() {
    this.drop('doctor_answers');
  }
}

module.exports = DoctorAnswerSchema;

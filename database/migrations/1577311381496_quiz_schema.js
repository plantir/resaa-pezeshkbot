'use strict';

/** @type {import('@adonisjs/lucid/src/Schema')} */
const Schema = use('Schema');

class QuizSchema extends Schema {
  up() {
    this.create('quizzes', table => {
      table.increments();
      table.string('title');
      table.text('question');
      table.json('answers');
      table.datetime('send_time');
      table.boolean('is_posted').defaultTo(false);
      table.boolean('is_deleted').defaultTo(false);
      table.timestamps();
    });
  }

  down() {
    this.drop('quizzes');
  }
}

module.exports = QuizSchema;

'use strict';

/** @type {import('@adonisjs/lucid/src/Schema')} */
const Schema = use('Schema');

class QuizAnswersSchema extends Schema {
  up() {
    this.create('quiz_answers', table => {
      table.increments();
      table
        .integer('quiz_id')
        .unsigned()
        .references('id')
        .inTable('quizzes');
      table
        .integer('user_id')
        .unsigned()
        .references('id')
        .inTable('users');
      table.boolean('is_correct').defaultTo(false);
      table.timestamps();
    });
  }

  down() {
    this.drop('quiz_answers');
  }
}

module.exports = QuizAnswersSchema;

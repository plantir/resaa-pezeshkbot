'use strict';

/** @type {import('@adonisjs/lucid/src/Schema')} */
const Schema = use('Schema');

class TestAnswerSchema extends Schema {
  up() {
    this.create('test_answers', table => {
      table.increments();
      table
        .integer('user_id')
        .unsigned()
        .references('id')
        .inTable('users');
      table.json('doctor');
      table.integer('doctor_chat_id');
      table
        .enum('status', ['request', 'sendToDoctor', 'answered', 'sendToClient'])
        .defaultTo('request');
      table.enum('answer_type', ['text', 'voice']);
      table.text('doctor_answer');
      table.integer('user_satisfaction');
      table.boolean('is_confirm').defaultTo(false);
      table.integer('price');
      table.json('files');
      table.boolean('is_deleted').defaultTo(false);
      table.timestamps();
    });
  }

  down() {
    this.drop('test_answers');
  }
}

module.exports = TestAnswerSchema;

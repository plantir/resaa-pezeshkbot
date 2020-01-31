'use strict';

/** @type {import('@adonisjs/lucid/src/Schema')} */
const Schema = use('Schema');

class AddPhoneSchema extends Schema {
  up() {
    this.table('users', table => {
      // alter table
      table.dropUnique('chat_id');
      table.string('phone').after('chat_id');
      table
        .enum('bot_source', ['resaa', 'pezeshk', 'doctor'])
        .defaultTo('pezeshk')
        .after('chat_id');
    });
  }

  down() {
    this.table('users', table => {
      // reverse alternations
    });
  }
}

module.exports = AddPhoneSchema;

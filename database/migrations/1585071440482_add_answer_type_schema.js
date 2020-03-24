'use strict';

/** @type {import('@adonisjs/lucid/src/Schema')} */
const Schema = use('Schema');
class AddAnswerTypeSchema extends Schema {
  up() {
    this.table('test_answers', table => {
      // alter table
      this.raw(
        `ALTER TABLE \`resaa_pezeshk_bot_db\`.\`test_answers\` 
      CHANGE COLUMN \`answer_type\` \`answer_type\` ENUM('text', 'voice', 'photo', 'file') NULL DEFAULT NULL ;
      `
      );
    });
  }

  down() {
    this.table('test_answers', table => {
      // reverse alternations
    });
  }
}

module.exports = AddAnswerTypeSchema;

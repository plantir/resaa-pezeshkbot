'use strict';

/** @type {import('@adonisjs/lucid/src/Schema')} */
const Schema = use('Schema');
const Database = use('Database');
class RoleValuesSchema extends Schema {
  async up() {
    await Database.raw(
      `INSERT INTO \`roles\` (\`name\`) VALUES ('administrator');`
    );
    await Database.raw(
      `INSERT INTO \`roles\` (\`name\`) VALUES ('bot_admin');`
    );
    await Database.raw(
      `INSERT INTO \`roles\` (\`name\`) VALUES ('application_admin');`
    );
    await Database.raw(
      `INSERT INTO \`roles\` (\`name\`) VALUES ('corona_admin');`
    );
  }

  down() {}
}

module.exports = RoleValuesSchema;

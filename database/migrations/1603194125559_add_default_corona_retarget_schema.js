'use strict';

/** @type {import('@adonisjs/lucid/src/Schema')} */
const Schema = use('Schema');
const CoroanRetarget = use('App/Models/CoronaRetarget');
class AddDefaultCoronaRetargetSchema extends Schema {
  async up() {
    await CoroanRetarget.create({
      id: 1,
      is_active: false,
      minute: 0,
      discount_id: null,
    });
  }

  async down() {
    let item = await CoroanRetarget.find(1);
    await item.delete();
  }
}

module.exports = AddDefaultCoronaRetargetSchema;

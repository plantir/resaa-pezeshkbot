'use strict';

/** @type {typeof import('@adonisjs/lucid/src/Lucid/Model')} */
const Model = use('Model');

class Admin extends Model {
  static boot() {
    super.boot();
    this.addHook('beforeSave', 'AdminHook.beforeSave');
  }
}

module.exports = Admin;

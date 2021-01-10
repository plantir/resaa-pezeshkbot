'use strict';

/** @type {typeof import('@adonisjs/lucid/src/Lucid/Model')} */
const Model = use('BaseModel');

class CheckupLanding extends Model {
  static boot() {
    super.boot();
    this.addTrait('ConvertToJson');
  }

  static get allowField() {
    return [
      'slug',
      'title',
      'description',
      'image',
      'color',
      'faq',
      'components',
      'conditions',
      'meta',
    ];
  }

  static get jsonFields() {
    return ['faq', 'conditions', 'meta'];
  }

  getMeta(item) {
    return item || [];
  }

  checkups() {
    return this.hasMany('App/Models/CheckupTest','id','landing_id');
  }
}

module.exports = CheckupLanding;

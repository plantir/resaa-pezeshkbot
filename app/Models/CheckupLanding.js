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
      'seo_title',
      'seo_description',
    ];
  }

  static get jsonFields() {
    return ['faq', 'conditions'];
  }

  getMeta(item) {
    return item || [];
  }
}

module.exports = CheckupLanding;

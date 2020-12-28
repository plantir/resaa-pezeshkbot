'use strict';

/** @type {typeof import('@adonisjs/lucid/src/Lucid/Model')} */
const Model = use('BaseModel');

class ResaaLanding extends Model {
  static boot() {
    super.boot();
    this.addTrait('ConvertToJson');
  }
  static get jsonFields() {
    return ['faqs', 'reviews'];
  }
  static get allowField() {
    return [
      'name',
      'first_ford_title',
      'first_ford_description',
      'faqs',
      'reviews',
    ];
  }
}

module.exports = ResaaLanding;

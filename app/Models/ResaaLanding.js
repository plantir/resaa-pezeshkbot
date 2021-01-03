'use strict';

/** @type {typeof import('@adonisjs/lucid/src/Lucid/Model')} */
const Model = use('BaseModel');

class ResaaLanding extends Model {
  static boot() {
    super.boot();
    this.addTrait('ConvertToJson');
  }
  static get jsonFields() {
    return ['faqs', 'reviews', 'meta'];
  }
  static get allowField() {
    return [
      'name',
      'meta',
      'first_ford_title',
      'first_ford_description',
      'faqs',
      'reviews',
    ];
  }

  getMeta(item){
    return item || []
  }
}

module.exports = ResaaLanding;

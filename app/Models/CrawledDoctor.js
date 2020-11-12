'use strict';

/** @type {typeof import('@adonisjs/lucid/src/Lucid/Model')} */
const Model = use('BaseModel');

class CrawledDoctor extends Model {
  static boot() {
    super.boot();
    this.addHook('beforeCreate', 'CrawledDoctorHook.beforeCreate');
    this.addHook('afterFind', 'CrawledDoctorHook.afterFind');
    this.addTrait('ConvertToJson');
  }
  static get jsonFields() {
    return ['addresses', 'pictureGallery'];
  }
  static get allowField() {
    return [
      'specialty_id',
      'firstName',
      'lastName',
      'medicalCouncilNumber',
      'scientificAwards',
      'addresses',
      'biography',
      'commentCount',
      'communityEnrollments',
      'expertise',
      'hospitals',
      'image',
      'instagram',
      'insurances',
      'languages',
      'pictureGallery',
      'scientificBackgrounds',
      'services',
      'source',
      'startPractiseDate',
      'state',
      'telegram',
      'url',
      'viewCount',
      'description',
    ];
  }
  static listOption(qs) {
    qs.withArray = ['speciality'].concat(qs.withArray || []);
    return super.listOption(qs);
  }
  speciality() {
    return this.belongsTo('App/Models/Speciality', 'specialty_id');
  }

  converted_doctor() {
    return this.belongsTo('App/Models/ConvertedDoctor');
  }
}

module.exports = CrawledDoctor;

'use strict';

/** @type {typeof import('@adonisjs/lucid/src/Lucid/Model')} */
const Model = use('BaseModel');

class DoctorReview extends Model {
  static get allowField() {
    return ['doctor_subscriber', 'owner_name', 'text', 'review_at'];
  }
  static get dates() {
    return super.dates.concat(['review_at']);
  }
}

module.exports = DoctorReview;

'use strict';

/** @type {typeof import('@adonisjs/lucid/src/Lucid/Model')} */
const Model = use('BaseModel');

class Reservation extends Model {
  static boot() {
    super.boot();
    this.addHook('beforeCreate', 'ReservationHook.beforeCreate');
  }
  static get allowField() {
    return [
      'doctor_subscriber',
      'patient_id',
      'status',
      'description',
      'start',
      'end',
    ];
  }
  static listOption(qs) {
    qs.withArray = ['patient'];
    return super.listOption(qs);
  }
  static get dates() {
    return super.dates.concat(['start', 'end']);
  }

  patient() {
    return this.belongsTo('App/Models/Patient');
  }
}

module.exports = Reservation;

'use strict';

/** @typedef {import('@adonisjs/framework/src/Request')} Request */
/** @typedef {import('@adonisjs/framework/src/Response')} Response */
/** @typedef {import('@adonisjs/framework/src/View')} View */
const Reservation = use('App/Models/Reservation');
const Patient = use('App/Models/Patient');
const moment = use('moment');
class ReservationController {
  async store({ request }) {
    let { name, email, mobile, reserve_time } = await request.post();
    let reservation = await request.only(Reservation.allowField);
    let reservation_time = moment(reserve_time);
    reservation.start = reservation_time.format('YYYY-MM-DD HH:mm');
    reservation.end = reservation_time
      .add(30, 'minute')
      .format('YYYY-MM-DD HH:mm');
    let user = await Patient.findBy({ mobile });
    if (!user) {
      user = await Patient.create({
        name,
        email,
        mobile,
      });
    }
    reservation.patient_id = user.id;
    reservation.status = 'payment_pending';
    return Reservation.create(reservation);
  }
}

module.exports = ReservationController;

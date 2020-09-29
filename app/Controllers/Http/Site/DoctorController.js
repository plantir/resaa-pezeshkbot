'use strict';
const Doctor = use('App/Models/Doctor');
const DoctorReview = use('App/Models/DoctorReview');
const Reservation = use('App/Models/Reservation');
const Application = use('App/Models/Application');
const axios = use('axios');
const Moment = use('moment');
const MomentRange = use('moment-range');
/** @type {import('moment')} */
const moment = MomentRange.extendMoment(Moment);
/** @type {import('lodash')} */
const _ = use('lodash');
const Env = use('Env');
const BASE_API = Env.getOrFail('RESAA_API');
class DoctorController {
  async query() {
    let { data } = await axios.get(
      '${BASE_API}/categories/8/RelatedDoctors?limit=15'
    );
    return data.result.relatedDoctors;
  }
  async show({ request, params: { id } }) {
    let { data } = await axios.get(
      `${BASE_API}/doctors/${id}/profile`
    );
    let doctor = data.result.doctor;
    let extra_field = await Doctor.findBy({ subscriber_number: id });
    extra_field = extra_field ? extra_field.toJSON() : {};
    let reviews = await DoctorReview.query()
      .where({ doctor_subscriber: id })
      .fetch();
    reviews = reviews.toJSON();
    if (doctor.specialtyEnglishTitle == 'Psychology') {
      extra_field.sessionTime = 30;
    } else {
      extra_field.sessionTime = 20;
    }
    return Object.assign({}, doctor, { extra_field, reviews });
  }
  async timeTable({ request, params: { id } }) {
    let days = {};
    const { data } = await axios.get(
      `${BASE_API}/Doctors/${id}/TimeTable`,
      {
        params: {
          clientTimeZoneOffset: -270,
        },
      }
    );
    let segments = data.result.timetable.segments;
    let reserved_tiems = await Reservation.query()
      .where({ doctor_subscriber: id })
      .where(
        'start',
        '>',
        moment().hour(0).minute(0).format('YYYY-MM-DD HH:mm')
      )
      .fetch();
    reserved_tiems = _.groupBy(reserved_tiems.toJSON(), (item) =>
      moment(item.start).format('YYYY-MM-DD')
    );
    for (const item of segments) {
      let start_hour = this._get_hour(item.from);
      let end_hour = this._get_hour(item.to);
      let start_minute = this._get_minute(item.from);
      let end_minute = this._get_minute(item.to);
      const day_of_week = this._get_day(item.from);
      let divided_time = this._divide_time({
        day_of_week,
        start_hour,
        end_hour,
        start_minute,
        end_minute,
        reserved_tiems,
      });
      days[day_of_week] = days[day_of_week] || [];
      days[day_of_week].push(...divided_time);
    }
    return days;
  }
  async version_list({ request }) {
    let versions = await Application.query()
      .where({ is_deleted: false })
      .orderBy('version')
      .fetch();
    return versions.toJSON().map((item) => item.version);
    // return ['1.0.8.0.info', '1.0.9.0.info', '1.2.0.0.info', '1.4.0.0.info'];
  }
  async version_info({ request, params: { version } }) {
    return Application.query()
      .where({ version })
      .where({ is_deleted: false })
      .first();
  }
  _get_hour(value) {
    let hour = Math.floor((value / 60) % 24);
    return hour < 10 ? `0${hour}` : hour;
  }
  _get_minute(value) {
    let minute = Math.round(((value / 60) % 1) * 60);
    return minute < 10 ? `0${minute}` : minute;
  }
  _get_day(value) {
    let index = Math.floor(value / 60 / 24);
    let date = moment().day(index).hour(23).minute(59).seconds(59);
    if (moment() > date) {
      date.add(1, 'weeks');
    }
    return date.format('YYYY-MM-DD');
    let day;
    switch (index) {
      case 0:
        day = 'Sa';
        break;
      case 1:
        day = 'Su';
        break;
      case 2:
        day = 'Mo';
        break;
      case 3:
        day = 'Tu';
        break;
      case 4:
        day = 'We';
        break;
      case 5:
        day = 'Th';
        break;
      case 6:
        day = 'Fr';
        break;
    }
    return;
  }
  _divide_time({
    day_of_week,
    start_hour,
    start_minute,
    end_hour,
    end_minute,
    reserved_tiems,
    step = 30,
  }) {
    let start = moment().hour(start_hour).minute(start_minute);
    let end = moment().hour(end_hour).minute(end_minute);
    let range = moment.range(start, end);
    return _.chunk(
      Array.from(
        range.by('minute', { step: step, excludeEnd: true })
      ).map((item) => item.format('HH:mm')),
      2
    ).map((item) => {
      let reserved = false;
      if (
        reserved_tiems[day_of_week] &&
        reserved_tiems[day_of_week].some(
          (time) => moment(time.start).format('HH:mm') == item[0]
        )
      ) {
        reserved = true;
      }
      if (
        day_of_week == moment().format('YYYY-MM-DD') &&
        item[0] < moment().format('HH:mm')
      ) {
        reserved = true;
      }
      return {
        start: item[0],
        end: item[1],
        reserved,
      };
    });
  }
}

module.exports = DoctorController;

'use strict';

/** @type {typeof import('@adonisjs/lucid/src/Lucid/Model')} */
const Model = use('BaseModel');

/** @type { import('@adonisjs/framework/src/Env')} */
const Env = use('Env');

const BASE_API = Env.getOrFail('RESAA_API');

/** @type { import('axios')} */
const axios = require('axios');

const bot = use('ResaaBot');
const _ = use('lodash');
const User = use('App/Models/User');
class Doctor extends Model {
  static boot() {
    super.boot();
    this.addHook('afterSave', 'DoctorHook.afterSave');
  }
  static get fields() {}
  static get allowField() {
    return [
      'first_name',
      'last_name',
      'subscriber_number',
      'speciality_id',
      'description',
      'image',
    ];
  }
  static get(id) {
    return new Promise(async (resolve, reject) => {
      try {
        let { data } = await axios.get(
          `${BASE_API}/doctors/${id}/?fields=id,firstName,providesDiagnosticDocumentsService,lastName,currentlyAvailable,subscriberNumber,specialty,tags,expertise,timetable,title,workplaces&clientTimeZoneOffset=-210`
        );
        resolve(data.result.doctor);
      } catch (error) {
        reject(error);
      }
    });
  }
  static timetable(id) {
    return new Promise(async (resolve, reject) => {
      try {
        let { data } = await axios.get(
          `${BASE_API}/doctors/${id}/TimeTable?clientTimeZoneOffset=${new Date().getTimezoneOffset()}`
        );
        resolve(data.result.timetable.segments);
      } catch (error) {
        reject(error);
      }
    });
  }
  static search({ limit = 20, offset = 0, specialtyId, code, name }) {
    return new Promise(async (resolve, reject) => {
      try {
        let url = `${BASE_API}/Doctors?fields=subscriberNumber,firstName,lastName&limit=${limit}&offset=${offset}`;
        if (specialtyId) {
          url += `&specialtyId=${specialtyId}`;
        }
        if (code) {
          url += `&code=${code}`;
        }
        if (name) {
          url += `&name=${name}`;
        }
        url = encodeURI(url);
        let { data } = await axios.get(url);
        resolve(data.result.doctors);
      } catch (error) {
        reject(error);
      }
    });
  }
  static get_image(id) {
    return new Promise(async (resolve, reject) => {
      try {
        let { data } = await axios.get(`${BASE_API}/doctors/${id}/image`, {
          responseType: 'stream',
        });
        resolve(data);
      } catch (error) {
        reject(error);
      }
    });
  }
  static get_time_price(id, phone) {
    return new Promise(async (resolve, reject) => {
      try {
        let { data } = await axios.get(
          `${BASE_API}/Rubika/Doctors/${id}/communicationquote?patientphonenumber=${phone}`
        );
        resolve(data.result.quote);
      } catch (error) {
        reject(error);
      }
    });
  }
  static book(id, phone) {
    return new Promise(async (resolve, reject) => {
      try {
        let { data } = await axios.get(
          `${BASE_API}/Doctors/${id}/CommunicationBooking?patientPhoneNumber=${phone}`
        );
        resolve(data);
      } catch (error) {
        reject(error);
      }
    });
  }
  static request_test_answer(id, phone) {
    return new Promise(async (resolve, reject) => {
      try {
        let { data } = await axios.get(
          `${BASE_API}/Doctors/${id}/DiagnosticDocumentsService/Quote?patientPhoneNumber=${phone}`
        );
        let status = data.result.quote.status;
        let request_price = data.result.quote.costPerRequest;
        switch (status) {
          case 0:
            resolve({
              status: 'ok',
              request_price: request_price,
              chat_id: data.result.quote.destinations[0].identifier,
            });
            break;
          case 1:
            resolve({
              status: 'ServiceUnavailable',
            });
            break;
          case 2:
            resolve({
              status: 'needTalk',
              request_price: request_price,
            });
            break;
          case 3:
            resolve({
              status: 'needMoney',
              request_price: request_price,
            });
            break;
        }
      } catch (error) {
        reject({
          error,
        });
      }
    });
  }

  static listOption(qs) {
    qs.withArray = ['speciality'].concat(qs.withArray || []);
    return super.listOption(qs);
  }
  static async sned_profile({ user, doctor_id }) {
    let doctor = await Doctor.get(doctor_id);
    let doctor_image_id = await Doctor.get_image(doctor_id);
    user.last_visit_doctor = doctor;
    await User.update_redis(user);
    let message = `\nدکتر ${doctor.firstName} ${doctor.lastName}`;
    message += `\nکد رسا ${doctor.subscriberNumber}`;
    if (doctor.expertise) {
      message += `\n${doctor.expertise}`;
    }
    message += `\nوضعیت ${
      doctor.currentlyAvailable ? ' ✅ در دسترس' : ' ❌ خارج از دسترس '
    }`;
    await bot.sendPhoto(user.chat_id, doctor_image_id, {
      caption: message,
    });
    // Doctor.saveImage(doctor.subscriberNumber, photo)
    let time_message = `زمان های پاسخگویی\n`;
    let segments = await Doctor.timetable(doctor_id);
    segments = _.sortBy(segments, (o) => o.from);
    for (const item of segments) {
      let date = Math.floor(item.from / 60 / 24);
      let date_name;
      switch (date) {
        case 0:
          date_name = 'شنبه              ';
          break;
        case 1:
          date_name = 'یکشنبه          ';
          break;
        case 2:
          date_name = 'دوشنبه          ';
          break;
        case 3:
          date_name = 'سه‌شنبه       ';
          break;
        case 4:
          date_name = 'چهارشنبه     ';
          break;
        case 5:
          date_name = 'پنجشنبه       ';
          break;
        case 6:
          date_name = 'جمعه             ';
          break;
      }
      let start_time_hour = Math.floor((item.from / 60) % 24);
      let end_time_hour = Math.floor((item.to / 60) % 24);
      let start_time_minute = Math.round(((item.from / 60) % 1) * 60);
      let end_time_minute = Math.round(((item.to / 60) % 1) * 60);
      if (start_time_minute < 10) {
        start_time_minute = `0${start_time_minute}`;
      }
      if (end_time_minute < 10) {
        end_time_minute = `0${end_time_minute}`;
      }
      if (start_time_hour < 10) {
        start_time_hour = `0${start_time_hour}`;
      }
      if (end_time_hour < 10) {
        end_time_hour = `0${end_time_hour}`;
      }
      time_message += `\n${date_name} ${end_time_hour}:${end_time_minute} - ${start_time_hour}:${start_time_minute}`;
    }
    time_message += `\n تماس از طریق رسا`;
    let options = {
      reply_markup: {
        keyboard: [],
        resize_keyboard: true,
      },
    };
    if (!user.phone) {
      options.reply_markup.keyboard.push([
        {
          text: `ثبت نام / ورود`,
          request_contact: true,
        },
      ]);
    }
    if (user.phone && doctor.providesDiagnosticDocumentsService) {
      options.reply_markup.keyboard.push([
        {
          text: `ارسال جواب آزمایش`,
        },
      ]);
    }
    if (user.phone && doctor.currentlyAvailable) {
      options.reply_markup.keyboard.push([
        {
          text: `تماس با دکتر ${doctor.firstName} ${doctor.lastName}`,
        },
      ]);
    }
    options.reply_markup.keyboard.push([
      {
        text: 'بازگشت',
      },
    ]);
    options.reply_markup.keyboard.push([
      {
        text: '🏠 بازگشت به خانه',
      },
    ]);

    bot.sendMessage(user.chat_id, time_message, options);
  }
  speciality() {
    return this.belongsTo('App/Models/Speciality');
  }
  answer() {
    return this.hasMany('App/Models/DoctorAnswer');
  }
}

module.exports = Doctor;

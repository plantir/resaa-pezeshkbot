'use strict';

/** @type {typeof import('@adonisjs/lucid/src/Lucid/Model')} */
const Model = use('Model');

/** @type {typeof import('@adonisjs/redis/src/Redis')} */
const Redis = use('Redis');

/** @type { import('axios')} */
const axios = require('axios');

/** @type { import('@adonisjs/framework/src/Env')} */
const Env = use('Env');

const BASE_API = Env.getOrFail('RESAA_API');

const Bull = use('Rocketseat/Bull');

const Message_JOB = use('App/Jobs/SendMessage');

const ScheduleMessage = use('App/Models/ScheduleMessage');

class User extends Model {
  static boot() {
    super.boot();
    this.addHook('beforeCreate', 'UserHook.beforeCreate');
    this.addHook('afterCreate', 'UserHook.afterCreate');
  }

  static async get(msg, bot_source) {
    let cached_user = await Redis.get(`${bot_source}_user_${msg.chat.id}`);
    if (cached_user) {
      return JSON.parse(cached_user);
    }
    let user = await this.query()
      .where({ chat_id: msg.chat.id })
      .where({ bot_source })
      .first();
    if (user) {
      await Redis.set(
        `${bot_source}_user_${msg.chat.id}`,
        JSON.stringify(user)
      );
      return user.toJSON();
    }
    return {};
  }
  static async getOrCreate(msg, bot_source) {
    let cached_user = await Redis.get(`${bot_source}_user_${msg.chat.id}`);
    if (cached_user) {
      return JSON.parse(cached_user);
    }
    let user = await this.query()
      .where({ chat_id: msg.chat.id })
      .where({ bot_source })
      .first();
    if (!user) {
      let caller_id = msg.text.split(' ')[1];
      let caller_user;
      if (caller_id) {
        caller_user = await this.query()
          .where({ chat_id: caller_id })
          .where({ bot_source })
          .first();
      }
      user = await User.create({
        chat_id: msg.chat.id,
        bot_source,
        refer_by: caller_user ? caller_user.id : null,
        question_count: 1,
      });
    }
    await Redis.set(`${bot_source}_user_${msg.chat.id}`, JSON.stringify(user));
    return user.toJSON();
  }
  static update_redis(user) {
    return Redis.set(
      `${user.bot_source}_user_${user.chat_id}`,
      JSON.stringify(user)
    );
  }
  static async sendToAll(schedule) {
    let users = await this.query()
      .where({ is_deleted: 0 })
      .where({ bot_source: 'pezeshk' })
      .fetch();
    for (let user of users.toJSON()) {
      Bull.add(Message_JOB.key, {
        user,
        schedule,
      });
      // kue.dispatch(
      //   Message_JOB.key,
      //   {
      //     user,
      //     schedule
      //   },
      //   {
      //     priority: 'high'
      //   }
      // );
    }
    // setTimeout(async () => {
    //   let success_count = await Redis.get(`schedule_${schedule.id}_success`);
    //   let fail_count = await Redis.get(`schedule_${schedule.id}_error`);
    //   await ScheduleMessage.query().where({ id: schedule.id }).update({
    //     success_count,
    //     fail_count,
    //   });
    //   await Redis.del(`schedule_${schedule.id}_success`);
    //   await Redis.del(`schedule_${schedule.id}_error`);
    // }, 300000);
  }
  register(phoneNumber) {
    return new Promise(async (resolve, reject) => {
      try {
        await axios.post(`${BASE_API}/rubika/Patients/Registration`, {
          phoneNumber,
        });
        this.phone = phoneNumber;
        this.save();
        resolve(true);
      } catch (err) {
        if (err.response.status == 409) {
          this.phone = phoneNumber;
          this.save();
          reject(
            'شما با این شماره موبایل قبلا ثبت نام کرده بودید و با موفقیت وارد شدید'
          );
        } else {
          reject('خطایی رخ داده است لطفا بعدا امتحان کنید');
        }
      }
    });
  }

  confirm_testAnswer(doctor_id, referenceNumber, user) {
    return new Promise(async (resolve, reject) => {
      try {
        let { data } = await axios.post(
          `${BASE_API}/Doctors/${doctor_id}/DiagnosticDocumentsService/Invoice?patientPhoneNumber=${user.phone}`
        );
        resolve(data);
      } catch (error) {
        reject(err);
      }
    });
  }
}

module.exports = User;

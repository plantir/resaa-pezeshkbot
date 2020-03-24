'use strict';

/** @type {typeof import('@adonisjs/lucid/src/Lucid/Model')} */
const Model = use('BaseModel');

/** @type { import('axios')} */
const axios = require('axios');

/** @type { import('@adonisjs/framework/src/Env')} */
const Env = use('Env');

/** @type {import('node-telegram-bot-api')} */
const ResaaBot = use('ResaaBot');

const BASE_API = Env.getOrFail('RESAA_API');

const moment = use('moment');

const fs = use('fs');

class TestAnswer extends Model {
  static boot() {
    super.boot();
    this.addTrait('ConvertToJson');
  }
  static get hidden() {
    return ['doctor_answer'];
  }
  static get jsonFields() {
    return ['files', 'doctor'];
  }
  static listOption(qs) {
    qs.withArray = ['user'].concat(qs.withArray || []);
    return super.listOption(qs);
  }
  static send({ user, doctor, price }) {
    const bot = use('DoctorBot');
    if (process.env.NODE_ENV == 'development') {
      doctor.chat_id = 96852497;
    }
    return new Promise(async (resolve, reject) => {
      if (!user.files || !user.files.length) {
        return reject(
          'شما فایلی برای ارسال ندارید لطفا مراحل ارسال جواب آزمایش را مجددا طی کنید'
        );
      }
      let testAnswer = await TestAnswer.create({
        doctor_chat_id: doctor.chat_id,
        price,
        doctor: doctor,
        user_id: user.id,
        files: user.files
      });
      user.photo = [];
      try {
        for (const file of user.files) {
          let name = `./tmp/test_answer/${Date.now()}.png`;
          let { data } = await axios.get(file, {
            responseType: 'stream'
          });
          data.pipe(fs.createWriteStream(name));
          // let photo = fs.createReadStream(name)
          user.photo.push(name.replace('./', '/').replace('tmp', 'download'));
          await bot.sendPhoto(doctor.chat_id, data, {
            caption: `#${testAnswer.id}`
          });
        }
        testAnswer.files = user.photo;
        testAnswer.status = 'sendToDoctor';
        await testAnswer.save();
        resolve({ tracking_code: testAnswer.id });
      } catch (error) {
        console.log(error);
        reject(error);
      }
    });
  }
  static confirm(doctor_id, testAnswer_id, user) {
    return new Promise(async (resolve, reject) => {
      try {
        let { data } = await axios.post(
          `${BASE_API}/Doctors/${doctor_id}/DiagnosticDocumentsService/Invoice?patientPhoneNumber=${user.phone}`,
          {
            requestsCount: 1,
            referenceNumber: testAnswer_id
          }
        );
        let test_answer = await TestAnswer.find(testAnswer_id);
        test_answer.is_confirm = true;
        await test_answer.save();
        resolve(data);
      } catch (error) {
        console.log(error);
        reject('خطایی رخ داده است');
      }
    });
  }
  static async reply(id, msg) {
    let test_answer = await this.find(id);
    test_answer.status = 'answered';
    if (msg.text) {
      test_answer.answer_type = 'text';
      test_answer.doctor_answer = msg.text;
    } else if (msg.voice) {
      test_answer.answer_type = 'text';
      test_answer.doctor_answer = msg.voice;
    } else if (msg.photo) {
      test_answer.answer_type = 'photo';
      test_answer.doctor_answer = msg.photo;
    } else if (msg.document) {
      test_answer.answer_type = 'file';
      test_answer.doctor_answer = msg.document;
    }
    test_answer.answer_at = moment().format('YYYY-MM-DD HH:mm');
    await test_answer.save();
    let title = `پاسخ پزشک به آزمایش شماره ${test_answer.id}:\n\n ‼️توجه : شما نمیتوانید روی  این پیغام ریپلای کنید`;
    await test_answer.load('user');
    await ResaaBot.sendMessage(test_answer.$relations.user.chat_id, title);
    if (msg.text) {
      await ResaaBot.sendMessage(
        test_answer.$relations.user.chat_id,
        `${msg.text}`,
        {}
      );
    } else if (msg.voice) {
      let voice = fs.createReadStream(msg.voice);
      await ResaaBot.sendVoice(test_answer.$relations.user.chat_id, voice, {});
    } else if (msg.photo) {
      let photo = fs.createReadStream(msg.photo);
      await ResaaBot.sendPhoto(test_answer.$relations.user.chat_id, photo, {});
    } else if (msg.document) {
      let document = fs.createReadStream(msg.document);
      await ResaaBot.sendDocument(
        test_answer.$relations.user.chat_id,
        document,
        {}
      );
    }
    await ResaaBot.sendMessage(
      test_answer.$relations.user.chat_id,
      'لطفا رضایت خود از جواب آزمایش را اعلام کنید کنید',
      {
        reply_markup: {
          inline_keyboard: [
            [
              {
                text: 'راضی بودم',
                callback_data: `test_answer:${test_answer.id}:5`
              },
              {
                text: 'راضی نبودم',
                callback_data: `test_answer:${test_answer.id}:1`
              }
            ]
          ]
        }
      }
    );
    test_answer.status = 'sendToClient';
    await test_answer.save();
  }
  user() {
    return this.belongsTo('App/Models/User');
  }
}

module.exports = TestAnswer;

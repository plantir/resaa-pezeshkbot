'use strict';
/** @type {import('node-telegram-bot-api')} */
const bot = use('PezeshkBot');

const Task = use('Task');

/** @type {typeof import('@adonisjs/lucid/src/Lucid/Model')} */
const Question = use('App/Models/Question');

/** @type {typeof import('@adonisjs/lucid/src/Lucid/Model')} */
const Doctor = use('App/Models/Doctor');

/** @type {typeof import('@adonisjs/lucid/src/Lucid/Model')} */
const DoctorAnswer = use('App/Models/DoctorAnswer');

/** @type {import('@adonisjs/framework/src/Logger')} */
const Logger = use('Logger');

/** @type {import('lodash')} */
const _ = use('lodash');

class SendQuestion extends Task {
  static get schedule() {
    return '0 * * * * *';
  }

  async handle() {
    try {
      let questions = await Question.query()
        .where({ is_deleted: 0 })
        .doesntHave('answer')
        .orWhereDoesntHave('answer', (builder) =>
          builder.where((builder) => builder.where({ is_expired: 0 }))
        )
        .fetch();
      let doctors = await Doctor.query()
        .where({ is_deleted: false })
        .whereDoesntHave('answer', (builder) =>
          builder.where((builder) =>
            builder.where({ is_expired: 0 }).whereNull('answer')
          )
        )
        .fetch();
      doctors = _.groupBy(doctors.toJSON(), 'speciality_id');
      for (const question of questions.toJSON()) {
        if (
          !doctors[question.speciality_id] ||
          doctors[question.speciality_id].length == 0
        ) {
          continue;
        }
        let doctor = doctors[question.speciality_id].pop();
        try {
          let message = await bot.sendMessage(
            doctor.chat_id,
            `با سلام کاربری سوال زیر را پرسیده است شما می توانید با ریپلای کردن همین پیام سوال وی را پاسخ دهید.:\n${question.text} \n\n#question_${question.id}`
          );
          await DoctorAnswer.create({
            question_id: question.id,
            doctor_id: doctor.id,
            message_id: message.message_id,
          });
        } catch (error) {
          Logger.error(error);
        }
      }
    } catch (error) {
      Logger.error(error);
    }
  }
}

module.exports = SendQuestion;

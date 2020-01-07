'use strict';
/** @type {import('node-telegram-bot-api')} */
const bot = use('Bot');

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
        .whereDoesntHave('answer', builder =>
          builder
            .where(builder =>
              builder.where({ is_expired: 0 }).whereNull('answer')
            )
            .orWhereNotNull('answer')
        )
        .fetch();
      // let da = await DoctorAnswer.query()
      //   .where(builder => builder.where({ is_expired: 0 }).whereNull('answer'))
      //   .orWhereNotNull('answer')
      //   .fetch();
      // questions = _.groupBy(questions.toJSON(), 'speciality_id');
      let doctors = await Doctor.query()
        .where({ is_deleted: false })
        // .groupBy('speciality_id')
        .fetch();
      doctors = _.groupBy(doctors.toJSON(), 'speciality_id');
      for (const question of questions.toJSON()) {
        if (doctors[question.speciality_id].length == 0) {
          continue;
        }
        let doctor = doctors[question.speciality_id].pop();
        try {
          let message = await bot.sendMessage(doctor.chat_id, question.text);
          await DoctorAnswer.create({
            question_id: question.id,
            doctor_id: doctor.id,
            message_id: message.message_id
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

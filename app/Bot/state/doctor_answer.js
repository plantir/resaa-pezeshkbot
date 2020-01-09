/** @type {import ('node-telegram-bot-api')} */
const bot = use('Bot');

/** @type {import ('@adonisjs/lucid/src/Lucid/Model')} */
const User = use('App/Models/User');

/** @type {import ('@adonisjs/lucid/src/Lucid/Model')} */
const Doctor = use('App/Models/Doctor');

/** @type {import ('@adonisjs/lucid/src/Lucid/Model')} */
const Question = use('App/Models/Question');

/** @type {import ('@adonisjs/lucid/src/Lucid/Model')} */
const DoctorAnswer = use('App/Models/DoctorAnswer');

const _enum = require('../config/enum');

/** @type {import('@adonisjs/framework/src/Env')} */
const Env = use('Env');

/** @type {import('@adonisjs/framework/src/Logger')} */
const Logger = use('Logger');

const SITE_URL = Env.getOrFail('SITE_URL');

const BOT_TOKEN = Env.getOrFail('BOT_TOKEN');
bot.on('message', async msg => {
  if (!msg.reply_to_message) {
    return;
  }
  let doctor = await Doctor.findBy({ chat_id: msg.chat.id });
  if (!doctor) {
    return;
  }
  try {
    if (!msg.voice && !msg.text) {
      return bot.sendMessage(
        msg.chat.id,
        `شما تنها امکان ارسال متن و صدا را برای بیمار دارید`
      );
    }
    let doctor_answer = await DoctorAnswer.query()
      .where({ message_id: msg.reply_to_message.message_id })
      .with('question', builder => builder.with('user'))
      .with('doctor')
      .first();
    let doctor_answer_json = doctor_answer.toJSON();
    if (msg.voice) {
      let { result } = await request.get({
        url: `https://api.telegram.org/bot${BOT_TOKEN}/getFile?file_id=${msg.voice.file_id}`,
        json: true
      });
      msg.voice.file_path = `https://api.telegram.org/file/bot${BOT_TOKEN}/${result.file_path}`;
      doctor_answer.answer = msg.voice.file_path;
    } else {
      doctor_answer.answer = msg.text;
    }
    let message = `سوال پرسیده شده توسط شما : \n${doctor_answer_json.question.text}\n\n پاسخ پزشک:\n${msg.text}`;
    let doctor_image = `${SITE_URL}${doctor_answer_json.doctor.image}`;
    await bot.sendPhoto(
      doctor_answer_json.question.user.chat_id,
      doctor_image,
      { caption: message }
    );
    bot.sendMessage(
      msg.chat.id,
      'پاسخ شما با موفقیت برای بیمار ارسال شد، سپاس',
      {
        reply_markup: {
          inline_keyboard: [
            [
              { text: 'برای امروز کافیه', callback_data: 'enough' },
              { text: 'سوال بعدی', callback_data: 'next_question' }
            ]
          ]
        }
      }
    );
    await doctor_answer.save();
  } catch (error) {
    Logger.error(error);
  }
});

bot.on('callback_query', async callback => {
  if (callback.data == 'enough') {
    return bot.sendMessage(
      callback.from.id,
      ' تشکر  و خسته نباشید بابت وقتی که برای بیماران رسا گذاشتید'
    );
  }
  if (callback.data == 'next_question') {
    let doctor = await Doctor.findBy({ chat_id: callback.from.id });
    let question = await Question.query()
      .where({ speciality_id: doctor.speciality_id })
      .whereDoesntHave('answer', builder => {
        builder
          .where(builder =>
            builder.where({ is_expired: 0 }).whereNull('answer')
          )
          .orWhereNotNull('answer');
      })
      .first();
    if (!question) {
      return bot.sendMessage(
        doctor.chat_id,
        'سوالات مربوط به تخصص شما تمام شده است'
      );
    }
    let message = await bot.sendMessage(
      doctor.chat_id,
      `${question.text}\n\n ℹ️ℹ️ برای پاسخ به این پرسش کافیست بر روی آن ریپلای کنید ℹ️ℹ️`
    );
    await DoctorAnswer.create({
      question_id: question.id,
      doctor_id: doctor.id,
      message_id: message.message_id
    });
  }
});

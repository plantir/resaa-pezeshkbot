// const User = require('../Model/User')
// const _ = require('lodash')
// const DoctorProvider = require('../provider/DoctorProvider')

/** @type {import('node-telegram-bot-api')} */
const bot = use('PezeshkBot');
const _enum = require('./enum');
const Doctor = use('App/Models/Doctor');
const Speciality = use('App/Models/Speciality');
const SaveFile = use('SaveFile');
bot.onText(_enum.regex_state.register_doctor, async (msg) => {
  bot.sendMessage(msg.chat.id, 'کد ۴ رقمی رسا پزشک را وارد نمایید');
});

bot.onText(/^\d{4}$/, async (msg) => {
  try {
    let doctor = await Doctor.get(msg.text);
    let message = `مشخصات پزشک \nنام پزشک ${doctor.firstName}\n نام خانوادگی: ${doctor.lastName} \n تخصص: ${doctor.specialtyTitle} \n 👩‍⚕️👨‍⚕️👩‍⚕️👨‍⚕️`;
    let doctor_image = await Doctor.get_image(msg.text);
    bot.sendPhoto(msg.chat.id, doctor_image, {
      caption: message,
      reply_markup: {
        inline_keyboard: [
          [
            {
              text: 'درسته',
              callback_data: `add_doctor:${msg.text}`,
              data: { name: 'armin' },
            },
          ],
          [
            {
              text: 'اشتباهه',
              callback_data: 'again',
            },
          ],
        ],
      },
    });
  } catch (error) {
    bot.sendMessage(msg.chat.id, 'کد پزشک وجود ندارد');
  }
});

bot.on('callback_query', async ({ data, from }) => {
  if (data !== 'again') {
    return;
  }
  bot.sendMessage(from.id, 'کد ۴ رقمی رسا پزشک را وارد نمایید');
});

bot.on('callback_query', async ({ data, from }) => {
  try {
    if (!data.startsWith('add_doctor')) {
      return;
    }
    let doctor_id = data.split(':')[1];
    let resaa_doctor = await Doctor.get(doctor_id);

    let doctor = await Doctor.query()
      .where({ is_deleted: false })
      .where({ chat_id: from.id })
      .first();
    if (!doctor) {
      doctor = new Doctor();
    }
    doctor.chat_id = from.id;
    doctor.subscriber_number = doctor_id;
    doctor.first_name = resaa_doctor.firstName;
    doctor.last_name = resaa_doctor.lastName;
    doctor.speciality_id = resaa_doctor.specialty.id;
    try {
      let doctor_image = await Doctor.get_image(doctor_id);
      doctor.image = SaveFile({ stream: doctor_image });
    } catch (error) {}
    let speciality = await Speciality.find(doctor.speciality_id);
    if (!speciality) {
      return bot.sendMessage(from.id, 'تخصص این پزشک در ربات رسا ثبت نشده است');
    }
    await doctor.save();
    bot.sendMessage(from.id, 'با موفقیت ثبت شد');
  } catch (error) {
    bot.sendError(from.id, error);
  }
});

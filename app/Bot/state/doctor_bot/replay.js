const moment = use('moment');

const bot = use('DoctorBot');
/** @type {import('node-telegram-bot-api')} */
const ResaaBot = use('ResaaBot');
const axios = use('axios');
const TestAnswer = use('App/Models/TestAnswer');

bot.on('message', async msg => {
  if (!msg.reply_to_message) {
    return;
  }
  try {
    if (!msg.voice && !msg.text) {
      return bot.sendMessage(
        msg.chat.id,
        `شما تنها امکان ارسال متن و صدا را برای بیمار دارید`
      );
    }
    let id = msg.reply_to_message.caption.replace('#', '');
    if (msg.voice) {
      let { data } = await axios.get(
        `https://api.telegram.org/bot${bot.token}/getFile?file_id=${msg.voice.file_id}`
      );
      msg.voice.file_path = `https://api.telegram.org/file/bot${bot.token}/${data.result.file_path}`;
      const { data: voice } = await axios.get(msg.voice.file_path, {
        responseType: 'stream'
      });
      let name = `./tmp/test_answer/${Date.now()}.mp3`;
      voice.pipe(fs.WriteStream(name)).on('finish', async () => {
        msg.voice = name;
        await TestAnswer.reply(id, msg);
      });
    } else {
      await TestAnswer.reply(id, msg);
    }
    // let test_answer = await TestAnswer.find(id);
    // test_answer.doctor_answer = msg.text || msg.voice.file_path;
    // test_answer.status = 'answered';
    // test_answer.answer_type = msg.text ? 'text' : 'voice';
    // test_answer.answer_at = moment().format('YYYY-MM-DD HH:mm');
    // await test_answer.save();
    // let title = `پاسخ پزشک به آزمایش شماره ${test_answer.id}:\n\n ‼️توجه : شما نمیتوانید روی  این پیغام ریپلای کنید`;
    // await test_answer.load('user');
    // await ResaaBot.sendMessage(test_answer.$relations.user.chat_id, title);
    // if (msg.text) {
    //   await ResaaBot.sendMessage(
    //     test_answer.$relations.user.chat_id,
    //     `${msg.text}`,
    //     {}
    //   );
    // } else if (msg.voice) {
    //   const { data } = await axios.get(msg.voice.file_path, {
    //     responseType: 'stream'
    //   });
    //   await ResaaBot.sendVoice(test_answer.$relations.user.chat_id, data, {});
    // }
    // await ResaaBot.sendMessage(
    //   test_answer.$relations.user.chat_id,
    //   'لطفا رضایت خود از جواب آزمایش را اعلام کنید کنید',
    //   {
    //     reply_markup: {
    //       inline_keyboard: [
    //         [
    //           {
    //             text: 'راضی بودم',
    //             callback_data: `test_answer:${test_answer.id}:5`
    //           },
    //           {
    //             text: 'راضی نبودم',
    //             callback_data: `test_answer:${test_answer.id}:1`
    //           }
    //         ]
    //       ]
    //     }
    //   }
    // );
    // test_answer.status = 'sendToClient';
    // await test_answer.save();
  } catch (error) {
    console.log(error);
  }
  // send to another
});

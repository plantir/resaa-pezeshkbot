const moment = use('moment');

const bot = use('DoctorBot');
/** @type {import('node-telegram-bot-api')} */
const ResaaBot = use('ResaaBot');
const axios = use('axios');
const TestAnswer = use('App/Models/TestAnswer');
/** @type {import('fs')} */
const fs = use('fs');
const Drive = use('Drive');
const FileType = use('file-type');
bot.on('message', async msg => {
  if (!msg.reply_to_message) {
    return;
  }
  try {
    // if (!msg.voice && !msg.text) {
    //   return bot.sendMessage(
    //     msg.chat.id,
    //     `شما تنها امکان ارسال متن و صدا را برای بیمار دارید`
    //   );
    // }
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
    } else if (msg.photo) {
      let { file_id } = msg.photo.reverse()[0];
      let { data } = await axios.get(
        `https://api.telegram.org/bot${bot.token}/getFile?file_id=${file_id}`
      );
      let file = `https://api.telegram.org/file/bot${bot.token}/${data.result.file_path}`;
      const { data: image } = await axios.get(file, {
        responseType: 'stream'
      });
      let name = `./tmp/test_answer/${Date.now()}.png`;
      image.pipe(fs.WriteStream(name)).on('finish', async () => {
        msg.photo = name;
        await TestAnswer.reply(id, msg);
      });
    } else if (msg.document) {
      let { file_id, file_name } = msg.document;
      let { data } = await axios.get(
        `https://api.telegram.org/bot${bot.token}/getFile?file_id=${file_id}`
      );
      let file = `https://api.telegram.org/file/bot${bot.token}/${data.result.file_path}`;
      const { data: document } = await axios.get(file, {
        responseType: 'arraybuffer'
      });
      let name = `./tmp/test_answer/${Date.now()}.${file_name.split('.')[1]}`;
      try {
        fs.writeFileSync(name, document, 'binary');
        msg.document = name;
        await TestAnswer.reply(id, msg);
      } catch (error) {}
    } else {
      await TestAnswer.reply(id, msg);
    }
  } catch (error) {
    console.log(error);
  }
  // send to another
});

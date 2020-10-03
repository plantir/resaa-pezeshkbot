/** @type {import ('node-telegram-bot-api')} */
const bot = use('DoctorBot');

const Logger = use('Logger');

bot.addListener('polling_error', (error) => {
  Logger.error(error);
});

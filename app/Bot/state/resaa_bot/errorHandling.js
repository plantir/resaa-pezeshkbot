/** @type {import ('node-telegram-bot-api')} */
const bot = use('ResaaBot');

const Logger = use('Logger');

bot.addListener('polling_error', (error) => {
  Logger.error(error);
});

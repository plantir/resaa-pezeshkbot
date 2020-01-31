/**  @type {import('node-telegram-bot-api')} */
const bot = use('Bot');
bot.connection('doctor_bot');
module.exports = bot;

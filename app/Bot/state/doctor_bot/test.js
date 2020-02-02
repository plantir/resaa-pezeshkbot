/** @type {typeof import('@adonisjs/lucid/src/Lucid/Model')} */
const User = use('App/Models/User');

/** @type {typeof import('@adonisjs/lucid/src/Lucid/Model')} */
const Doctor = use('App/Models/Doctor');

/** @type {import('node-telegram-bot-api')} */
const bot = use('DoctorBot');

bot.onText(/mychatid/, async msg => {
  bot.sendMessage(msg.chat.id, msg.chat.id);
});
bot.onText(/شروع|بازگشت به خانه|start/i, async msg => {
  let user = await bot.getOrCreateUser(msg);
  await bot.sendMessage(msg.chat.id, 'hi');
});

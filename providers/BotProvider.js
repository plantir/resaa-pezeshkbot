'use strict';

const { ServiceProvider } = require('@adonisjs/fold');
const TelegramBot = require('node-telegram-bot-api');
// const Env = use('Env');

class Bot extends TelegramBot {
  //   async sendMessage(chatId, text, body = {}, whith_history = true) {
  //     if (whith_history) {
  //       let user = new User(chatId);
  //       await user.push_history({
  //         text,
  //         body
  //       });
  //     }
  //     return super.sendMessage(chatId, text, body);
  //   }
  //   async sendPhoto(chatId, doctor_image_id, body = {}, whith_history = true) {
  //     if (whith_history) {
  //       let user = new User(chatId);
  //       await user.push_history({
  //         text: doctor_image_id,
  //         body
  //       });
  //     }
  //     return super.sendPhoto(chatId, doctor_image_id, body);
  //   }
}

class BotProvider extends ServiceProvider {
  /**
   * Register namespaces to the IoC container
   *
   * @method register
   *
   * @return {void}
   */
  register() {
    this.app.singleton('Bot', () => {
      const Env = this.app.use('Adonis/Src/Env');
      const Logger = this.app.use('Logger');
      const token = Env.get('BOT_TOKEN');
      const mode = Env.get('BOT_MODE', 'polling');
      const is_polling = mode == 'polling' ? true : false;
      let bot = new Bot(token, {
        polling: is_polling
      });
      bot.sendError = function(id, error) {
        Logger.error(error);
        this.sendMessage(id, 'خطایی رخ داده است');
      };
      return bot;
    });

    // this.app.alias('App/../providers/BotProvider.js', 'Bot');
  }

  /**
   * Attach context getter when all providers have
   * been registered
   *
   * @method boot
   *
   * @return {void}
   */
  boot() {
    this.app.use('App/Bot/index.js');
  }
}

module.exports = BotProvider;

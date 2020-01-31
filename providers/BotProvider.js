'use strict';

const { ServiceProvider } = require('@adonisjs/fold');
const TelegramBot = require('node-telegram-bot-api');
// const Env = use('Env');

class Bot extends TelegramBot {
  constructor(token, options, Config) {
    super(token, options);
    this.Config = Config;
  }
  connection(name) {
    name = name || this.Config.get('bot.connection');

    /**
     * Cannot get default connection
     */
    if (!name) {
      throw GE.InvalidArgumentException.invalidParameter(
        'Make sure to define connection inside config/bot.js file'
      );
    }

    /**
     * Get connection config
     */
    const connectionConfig = this.Config.get(`bot.${name}`);

    /**
     * Cannot get config for the defined connection
     */
    if (!connectionConfig) {
      throw GE.RuntimeException.missingConfig(name, 'config/bot.js');
    }

    this.token = connectionConfig.token;
  }
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
    this.app.bind('Bot', app => {
      const Env = app.use('Adonis/Src/Env');
      const Logger = app.use('Logger');
      const Config = app.use('Adonis/Src/Config');
      let name = Config.get('bot.connection');
      if (!name) {
        throw GE.InvalidArgumentException.invalidParameter(
          'Make sure to define connection inside config/bot.js file'
        );
      }
      const connectionConfig = Config.get(`bot.${name}`);
      if (!connectionConfig) {
        throw GE.RuntimeException.missingConfig(name, 'config/bot.js');
      }

      let token = connectionConfig.token;
      const mode = Env.get('BOT_MODE', 'polling');
      const is_polling = mode == 'polling' ? true : false;
      let bot = new Bot(
        token,
        {
          polling: is_polling
        },
        Config
      );
      // bot.connection();
      bot.sendError = function(id, error) {
        Logger.error(error);
        this.sendMessage(id, 'خطایی رخ داده است');
      };
      // ResaaBot: 'App/Bot/Service/ResaaBot',
      // PezeshkBot: 'App/Bot/Service/PezeshkBot',
      // DoctorBot: 'App/Bot/Service/DoctorBot'
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
    this.app.alias('App/Bot/Service/ResaaBot', 'ResaaBot');
    this.app.alias('App/Bot/Service/PezeshkBot', 'PezeshkBot');
    this.app.alias('App/Bot/Service/DoctorBot', 'DoctorBot');
    this.app.use('App/Bot/state/index.js');
  }
}

module.exports = BotProvider;

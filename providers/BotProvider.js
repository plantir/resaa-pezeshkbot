'use strict';

const { ServiceProvider } = require('@adonisjs/fold');
const TelegramBot = require('node-telegram-bot-api');
// const Env = use('Env');

class BotProvider extends ServiceProvider {
  /**
   * Register namespaces to the IoC container
   *
   * @method register
   *
   * @return {void}
   */
  register() {
    this.app.singleton('Adonis/Src/TelegromBot', app => {
      const Env = app.use('Adonis/Src/Env');
      const Logger = app.use('Logger');
      const Config = app.use('Adonis/Src/Config');
      return class Bot extends TelegramBot {
        static get token() {}
        connection(name) {
          name = name || Config.get('bot.connection');

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
          const connectionConfig = Config.get(`bot.${name}`);

          /**
           * Cannot get config for the defined connection
           */
          if (!connectionConfig) {
            throw GE.RuntimeException.missingConfig(name, 'config/bot.js');
          }

          this.token = connectionConfig.token;
        }
        sendError(id, error) {
          Logger.error(error);
          this.sendMessage(id, 'خطایی رخ داده است');
        }
      };
    });
    this.app.alias('Adonis/Src/TelegromBot', 'Bot');
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
    // this.app.alias('App/Bot/Service/ResaaBot', 'ResaaBot');
    // this.app.alias('App/Bot/Service/PezeshkBot', 'PezeshkBot');
    // this.app.alias('App/Bot/Service/DoctorBot', 'DoctorBot');
    // this.app.use('App/Bot/state/index.js');
  }
}

module.exports = BotProvider;

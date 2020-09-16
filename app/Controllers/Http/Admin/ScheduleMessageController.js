'use strict';

/** @typedef {import('@adonisjs/framework/src/Request')} Request */
/** @typedef {import('@adonisjs/framework/src/Response')} Response */
/** @typedef {import('@adonisjs/framework/src/View')} View */

const Resource = use('Resource');

/** @type {import('node-telegram-bot-api')} */
const bot = use('PezeshkBot');

const Bull = use('Rocketseat/Bull');

const Message_JOB = use('App/Jobs/SendMessage');

class ScheduleMessageController extends Resource {
  constructor() {
    super();
    this.Model = use('App/Models/ScheduleMessage');
  }

  async send_test({ request, params: { id } }) {
    let { chat_id } = request.post();
    let schedule = await this.Model.find(id);
    Bull.add(Message_JOB.key, {
      user: { chat_id },
      is_test: true,
      schedule: schedule.toJSON(),
    });
    // return bot.sendMessage(chat_id, schedule.text);
  }
}

module.exports = ScheduleMessageController;

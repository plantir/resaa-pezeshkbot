'use strict';

/** @typedef {import('@adonisjs/framework/src/Request')} Request */
/** @typedef {import('@adonisjs/framework/src/Response')} Response */
/** @typedef {import('@adonisjs/framework/src/View')} View */

const Resource = use('Resource');

/** @type {import('node-telegram-bot-api')} */
const bot = use('PezeshkBot');
class ScheduleMessageController extends Resource {
  constructor() {
    super();
    this.Model = use('App/Models/ScheduleMessage');
  }

  async send_test({ request, params: { id } }) {
    let { chat_id } = request.post();
    let schedule = await this.Model.find(id);
    return bot.sendMessage(chat_id, schedule.text);
  }
}

module.exports = ScheduleMessageController;

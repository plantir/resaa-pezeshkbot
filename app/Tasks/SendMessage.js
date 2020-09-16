'use strict';

const Task = use('Task');
const ScheduleMessage = use('App/Models/ScheduleMessage');
const User = use('App/Models/User');
const moment = use('moment');
/** @type {import('@adonisjs/framework/src/Logger')} */
const Logger = use('Logger');
class SendMessage extends Task {
  static get schedule() {
    return '10 * * * * *';
  }

  async handle() {
    try {
      let start_date = moment().second(0).format('YYYY-MM-DD HH:mm:ss');
      let end_date = moment().second(59).format('YYYY-MM-DD HH:mm:ss');
      let scheduleList = await ScheduleMessage.query()
        .where({ is_deleted: 0 })
        .where({ is_send: 0 })
        .whereBetween('send_time', [start_date, end_date])
        .fetch();
      for (const item of scheduleList.rows) {
        User.sendToAll(item.toJSON());
        item.is_send = 1;
        item.save();
      }
    } catch (error) {
      Logger.error(error);
    }
  }
}

module.exports = SendMessage;

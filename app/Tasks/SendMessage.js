'use strict';

const Task = use('Task');
const ScheduleMessage = use('App/Models/ScheduleMessage');
const User = use('App/Models/User');
const moment = use('moment');
class SendMessage extends Task {
  static get schedule() {
    return '30 * * * * *';
  }

  async handle() {
    try {
      let start_date = moment()
        .second(0)
        .format('YYYY-MM-DD HH:mm:ss');
      let end_date = moment()
        .add(1, 'minute')
        .second(0)
        .format('YYYY-MM-DD HH:mm:ss');
      let scheduleList = await ScheduleMessage.query()
        .where('is_deleted', 0)
        // .whereBetween('send_time', [start_date, end_date])
        .fetch();
      for (const item of scheduleList.toJSON()) {
        User.sendToAll(item);
      }
    } catch (error) {
      console.log(error);
    }
  }
}

module.exports = SendMessage;

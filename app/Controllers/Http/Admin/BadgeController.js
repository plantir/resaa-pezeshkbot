'use strict';
const CoroanOrder = use('App/Models/CoronaOrder');
const CheckupOrder = use('App/Models/CheckupOrder');
const PrescriptOrder = use('App/Models/PrescriptOrder');
class BadgeController {
  async getBadge({ params: { path } }) {
    if (path == 'corona') {
      let count = await CoroanOrder.query()
        .where({ is_deleted: false })
        .where({ status: 'pending' })
        .count('* as total');
      return count[0].total;
    }
    if (path == 'checkup') {
      let count = await CheckupOrder.query()
        .where({ is_deleted: false })
        .where({ status: 'pending' })
        .count('* as total');
      return count[0].total;
    }
    if (path == 'prescript') {
      let count = await PrescriptOrder.query()
        .where({ is_deleted: false })
        .where({ status: 'pending' })
        .count('* as total');
      return count[0].total;
    }
    return 0;
  }
}

module.exports = BadgeController;

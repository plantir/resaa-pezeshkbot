'use strict';
const Resource = use('Resource');
const Excel = use('exceljs');
const moment = require('moment-jalaali');
const fs = use('fs');
class CoronaOldOrderController extends Resource {
  constructor() {
    super();
    this.Model = use('App/Models/CoronaOrder');
  }

  async exportExcel({ response }) {
    let orders = await this.Model.query()
      .with('transaction')
      .whereHas('transaction', (builder) => builder.where({ status: 'paid' }))
      .where({ is_deleted: false })
      .fetch();
    var workbook = new Excel.Workbook();
    var worksheet = workbook.addWorksheet('corona_test');
    worksheet.columns = [
      { header: 'id', key: 'id', width: 15 },
      { header: 'نام', key: 'name', width: 15 },
      { header: 'موبایل', key: 'mobile', width: 12 },
      { header: 'تست', key: 'test_type', width: 12 },
      { header: 'مبلغ', key: 'amount', width: 11 },
      { header: 'تاریخ', key: 'date', width: 11 },
      { header: 'زمان', key: 'time', width: 11 },
    ];
    for (let order of orders.rows) {
      worksheet.addRow({
        id: order.id,
        name: order.user_fullname,
        mobile: order.user_mobile,
        test_type: order.test.name,
        amount: order.total_amount,
        date: moment(order.created_at).format('jYYYY/jMM/jDD'),
        time: moment(order.created_at).format('HH:MM'),
      });
    }
    fs.mkdirSync('tmp/report/', { recursive: true });
    response.header(
      'Content-Type',
      'application/vnd.openxmlformats-officedocument.spreadsheetml.sheet'
    );
    response.header(
      'Content-Disposition',
      'attachment; filename=' + 'Report.xlsx'
    );
    return workbook.xlsx.write(response.response);
  }

  async flow({ request }) {
    let options = request.get();
    if (options.filters) {
      options.filters = JSON.parse(options.filters);
    } else {
      options.filters = [];
    }
    options.filters.push('transaction.status:paid');
    options.filters.push('status:canceled:<>');
    options.filters.push('status:test_result_posted:<>');
    options.filters = JSON.stringify(options.filters);
    return this.Model.listOption(options);
  }
}
module.exports = CoronaOldOrderController;

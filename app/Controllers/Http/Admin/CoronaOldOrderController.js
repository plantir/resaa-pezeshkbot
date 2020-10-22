'use strict';
const Resource = use('Resource');
const Excel = use('exceljs');
const moment = require('moment-jalaali');
const fs = use('fs');
const Env = use('Env');
class CoronaOldOrderController extends Resource {
  constructor() {
    super();
    this.Model = use('App/Models/CoronaOldOrder');
  }

  async exportExcel({ response,request }) {
    let { filters } = request.get();
    let orders = await this.Model.listOption({ filters, perPage: 10000 });
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
        name: order.name,
        mobile: order.mobile,
        test_type: {
          2304: 'تست AntyBody',
          2305: 'تست PCR',
          2306: 'PCR & AntyBody',
        }[order.doctor_id],
        amount: order.amount,
        date: moment(order.created_at).format('jYYYY/jMM/jDD'),
        time: moment(order.created_at).format('HH:mm'),
      });
    }
    var fileName = `لیست سفارشات.xlsx`;
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
    return { file: `${Env.get('APP_URL')}/admin/report/${fileName}` };
  }

  async flow({ request }) {
    let options = request.get();
    if (options.filters) {
      options.filters = JSON.parse(options.filters);
    } else {
      options.filters = [];
    }
    options.filters.push('payment_status:paid');
    options.filters.push('status:canceled:<>');
    options.filters.push('status:test_result_posted:<>');
    options.filters = JSON.stringify(options.filters);
    return this.Model.listOption(options);
  }
}
module.exports = CoronaOldOrderController;

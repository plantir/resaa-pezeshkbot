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

  async exportExcel({ response, request }) {
    let { filters } = request.get();
    let orders = await this.Model.listOption({ filters, perPage: 10000 });
    var workbook = new Excel.Workbook();
    var worksheet = workbook.addWorksheet('corona_test');
    worksheet.columns = [
      { header: 'id', key: 'id', width: 15 },
      { header: 'نام', key: 'name', width: 15 },
      { header: 'موبایل', key: 'mobile', width: 12 },
      { header: 'کد ملی', key: 'nationalcode', width: 12 },
      { header: 'تست', key: 'test_type', width: 12 },
      { header: 'تعداد', key: 'count', width: 12 },
      { header: 'مبلغ کل', key: 'total_amount', width: 11 },
      { header: 'مبلغ پیش پرداخت', key: 'prepay_amount', width: 11 },
      { header: 'تخفیف روی تعداد', key: 'role_discount_amount', width: 11 },
      { header: 'کد تخفیف', key: 'discount_amount', width: 11 },
      { header: 'باقی مانده', key: 'payable_amount', width: 11 },
      { header: 'وضعیت پرداخت', key: 'transaciton_status', width: 11 },
      { header: 'تاریخ', key: 'date', width: 11 },
      { header: 'زمان', key: 'time', width: 11 },
    ];
    for (let order of orders.rows) {
      worksheet.addRow({
        id: order.id,
        name: order.user_fullname,
        mobile: order.user_mobile,
        nationalcode: order.user_nationalcode,
        test_type: order.selected_test.name,
        count: order.count,
        total_amount: order.total_amount,
        prepay_amount: order.prepay_amount,
        role_discount_amount: order.role_discount_amount,
        discount_amount: order.discount_amount,
        payable_amount: order.payable_amount,
        transaciton_status: order.$relations.transaction.status,
        date: moment(order.created_at).format('jYYYY/jMM/jDD'),
        time: moment(order.created_at).format('HH:mm'),
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

  async changeIsCalled({ request, params: { id } }) {
    let order = await this.Model.find(id);
    let { is_called } = request.post();
    order.is_called = is_called;
    return order.save();
  }

  async changeIsNegotiated({ request, params: { id } }) {
    let order = await this.Model.find(id);
    let { is_negotiated } = request.post();
    order.is_negotiated = is_negotiated;
    return order.save();
  }
}
module.exports = CoronaOldOrderController;

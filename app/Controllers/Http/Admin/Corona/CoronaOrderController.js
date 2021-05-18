'use strict';
const Resource = use('Resource');
const Excel = use('exceljs');
const View = use('View');
const Helpers = use('Helpers');
const pdf = use('html-pdf');
const moment = require('moment-jalaali');
/** @type {import('fs')} */
const fs = use('fs');
/** @type {import('lodash')} */
const _ = use('lodash');
const Env = use('Env');
const archiver = require('archiver');
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
      { header: 'شهر', key: 'city', width: 11 },
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
      { header: 'توضیحات', key: 'description', width: 11 },
      { header: 'کدپیگیری درگاه', key: 'tracking_code', width: 11 },
      { header: 'نمونه گیر', key: 'sampler', width: 11 },
      { header: 'آزمایشگاه', key: 'labratory', width: 11 },
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
        description: order.description,
        city: order.$relations.city.name,
        tracking_code: order.$relations.transaction.tracking_code,
        sampler: order.$relations.sampler ? order.$relations.sampler.name : '',
        labratory: order.$relations.labratory
          ? order.$relations.labratory.name
          : '',
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

  async ExportFactor({ response, request }) {
    try {
      let { filters } = request.get();
      let buffer_array = [];
      let orders = await this.Model.listOption({ filters, perPage: 10 });
      orders = orders.toJSON();
      for (let order of orders.data) {
        order.unit_amount =
          Math.round((order.selected_test.total_amount * 100) / 109) * 10;
        order.discount_amount =
          Math.round(
            order.role_discount_amount ||
              (0 + order.discount && order.discount.amount)
              ? order.discount.amount
              : 0
          ) * 10;
        order.tax_amount =
          Math.round(
            (order.selected_test.total_amount * order.count * 9) / 109
          ) * 10;
        let buffer = await this.generatePDF(order);
        buffer_array.push({ buffer, name: `${order.created_at}.pdf` });
      }
      let file = await this.archiveFiles(buffer_array);
      await response.download(file);
      // output.pipe(response.response)
      // let html = View.render('pdf.invoice', { order });
      // response.safeHeader('Content-type', 'application/pdf');
      // response.safeHeader(
      //   'Content-Disposition',
      //   `attachment; filename=invoice_1.pdf`
      // );
      // pdf.create(html).toStream(function (err, stream) {
      //   stream.pipe(response.response);
      // });
      // pdf.create(html).toBuffer(function (err, buffer) {
      //   const buffer3 = Buffer.from('buff it!');
      //   // const a =
      // });

      // finalize the archive (ie we are done appending files but streams have to finish yet)
      // 'close', 'end' or 'finish' may be fired right after calling this method so register to them beforehand
    } catch (error) {
      console.log(error);
      return error;
    }
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

  async getCount({ request }) {
    let { filters } = request.get();
    let orders = await this.Model.listOption({ filters, perPage: 10000 });
    return _.sumBy(orders.rows, 'count');
  }

  generatePDF(order) {
    return new Promise(async (resolve, reject) => {
      let html = View.render('pdf.invoice', { order });
      const base = Env.get('APP_URL');
      const options = {
        // format: 'A4',
        // zoom: 0.72,
        // width: '280mm',
        // height: '396mm',
        base: base,
      };
      // pdf.create(html, options).toStream(async (err, stream) => {
      //   if (err) return reject(err);
      //   resolve(stream);
      // });
      pdf.create(html, options).toBuffer(async (err, buffer) => {
        if (err) return reject(err);
        resolve(buffer);
      });
    });
  }

  archiveFiles(buffer_array) {
    return new Promise((resolve, reject) => {
      let date = new Date().getTime();
      let name = `./tmp/factor_${date}.zip`;
      const output = fs.createWriteStream(name);
      const archive = archiver('zip', {
        zlib: { level: 9 }, // Sets the compression level.
      });

      // listen for all archive data to be written
      // 'close' event is fired only when a file descriptor is involved
      output.on('close', function () {
        let file = Helpers.tmpPath(name.replace('./tmp/', ''));
        resolve(file);
        console.log(archive.pointer() + ' total bytes');
        console.log(
          'archiver has been finalized and the output file descriptor has closed.'
        );
      });

      // This event is fired when the data source is drained no matter what was the data source.
      // It is not part of this library but rather from the NodeJS Stream API.
      // @see: https://nodejs.org/api/stream.html#stream_event_end
      output.on('end', function () {
        console.log('Data has been drained');
      });

      // good practice to catch warnings (ie stat failures and other non-blocking errors)
      archive.on('warning', function (err) {
        if (err.code === 'ENOENT') {
          // log warning
        } else {
          // throw error
          throw err;
        }
      });

      // good practice to catch this error explicitly
      archive.on('error', function (err) {
        throw err;
      });
      for (let item of buffer_array) {
        archive.append(item.buffer, { name: item.name });
      }
      // pipe archive data to the file
      archive.pipe(output);
      archive.finalize();
    });
  }
}
module.exports = CoronaOldOrderController;

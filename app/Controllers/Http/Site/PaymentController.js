'use strict';
const soap = require('soap');
const VERIFY_URL = 'https://verify.sep.ir/payments/referencepayment.asmx?WSDL';
const CoronaOrder = use('App/Models/CoronaOrder');
const CheckupOrder = use('App/Models/CheckupOrder');
const PrescriptOrder = use('App/Models/PrescriptOrder');
const Logger = use('Logger');
const Env = use('Env');
class SamanGetway {
  constructor(MID) {
    this.MID = MID;
  }
  make_clien(url) {
    return soap.createClientAsync(url);
  }
  async VerifyTransaction(RefNum) {
    let client = await this.make_clien(VERIFY_URL);
    let params = {
      String_1: String(RefNum),
      String_2: String(this.MID),
    };
    return client.verifyTransactionAsync(params);
  }
}

class PaymentController {
  constructor() {
    this.gw = new SamanGetway(Env.get('SAMAN_TERMINAL_ID'));
  }
  async callback({ request, response }) {
    let bank_response = request.post();
    Logger.info('bankResponse', bank_response);
    let { order, callbackUrl } = await this._getOrder(bank_response.ResNum);
    if (!order) {
      response.redirect(
        `${Env.get('SITE_URL')}/bank-return?ResNum=${encodeURIComponent(
          data.ResNum
        )}`
      );
    }
    let transaction = await order.transaction().fetch();
    transaction.bank_response = bank_response;
    transaction.tracking_code = bank_response.RRN;
    if (bank_response.RefNum) {
      let res = await this.gw.VerifyTransaction(bank_response.RefNum);
      if (res[0].result.$value > 0) {
        transaction.status = 'paid';
      }
    }
    await transaction.save();
    response.redirect(
      `${Env.get(
        'RESAA_SITE'
      )}/${callbackUrl}/callback?requestId=${encodeURIComponent(
        bank_response.ResNum
      )}`
    );
  }

  _getOrder(guid) {
    return new Promise(async (resolve, reject) => {
      let order = await CoronaOrder.query().where({ guid }).first();
      if (order) {
        return resolve({ order, callbackUrl: 'corona-test' });
      }
      order = await CheckupOrder.query().where({ guid }).first();
      if (order) {
        return resolve({ order, callbackUrl: 'test-at-home/prescription' });
      }
      order = await PrescriptOrder.query().where({ guid }).first();
      if (order) {
        return resolve({ order, callbackUrl: 'test-at-home/checkup' });
      }
    });
  }
}

module.exports = PaymentController;

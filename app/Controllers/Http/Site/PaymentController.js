'use strict';
const soap = require('soap');
const VERIFY_URL = 'https://verify.sep.ir/payments/referencepayment.asmx?WSDL';
const CoronaTransaction = use('App/Models/CoronaTransaction');
const Logger = use('Logger');
const Env = use('Env');
class SamanGetwat {
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
    this.gw = new SamanGetwat(Env.get('SAMAN_TERMINAL_ID'));
  }
  async callback({ request, response }) {
    let bank_response = request.post();
    Logger.info('bankResponse', bank_response);
    let transaction = await CoronaTransaction.find(bank_response.ResNum);
    if (!transaction) {
      response.redirect(
        `${Env.get('SITE_URL')}/bank-return?ResNum=${encodeURIComponent(
          data.ResNum
        )}`
      );
    }
    transaction.bank_response = bank_response;
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
      )}/corona-test/callback?chargeRequestId=${encodeURIComponent(
        bank_response.ResNum
      )}`
    );
  }
}

module.exports = PaymentController;

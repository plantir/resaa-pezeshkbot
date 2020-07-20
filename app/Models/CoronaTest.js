'use strict';

/** @type {typeof import('@adonisjs/lucid/src/Lucid/Model')} */
const Model = use('BaseModel');

/** @type { import('axios')} */
const axios = use('axios');

/** @type { import('@adonisjs/framework/src/Env')} */
const Env = use('Env');

const BASE_API = Env.getOrFail('RESAA_API');

const Logger = use('Logger');
class CoronaTest extends Model {
  static boot() {
    super.boot();
    this.addTrait('ConvertToJson');
  }
  static get jsonFields() {
    return ['symptoms'];
  }
  static get allowField() {
    return [
      'charge_id',
      'doctor_id',
      'amount',
      'name',
      'nationalCode',
      'symptoms',
      'mobile',
      'address',
      'phoneNumber',
      'subscriberNumber',
      'paymentRequestId',
      'trackingNumber',
      'trackingImage',
      'status',
      'payment_status',
      'description',
    ];
  }

  async checkChargeRequest(chargeRequestId) {
    return new Promise(async (resolve, reject) => {
      try {
        this.chargeRequestId = chargeRequestId;
        let {
          data: { result },
        } = await axios.get(`${BASE_API}/Charge/${chargeRequestId}/Receipt`);
        this.trackingNumber = result.chargeReceipt.trackingNumber;
        if (result.chargeReceipt.currentBalance < this.amount) {
          Logger.error('currentBalance', { result, test_id: this.id });
          reject(result);
        } else if (result.chargeReceipt.status == 'Successful') {
          Logger.info('successCharge', { result, test_id: this.id });
          resolve(result);
        } else {
          Logger.error('chargeNotSuccess', { result, test_id: this.id });
          reject(result);
        }
      } catch (error) {
        Logger.error('chargeFail', { error, test_id: this.id });
        reject(error);
      }
      await this.save();
    });
  }
  confirmPayment() {
    return new Promise(async (resolve, reject) => {
      try {
        let { data } = await axios.post(
          `${BASE_API}/Doctors/${this.doctor_id}/DiagnosticDocumentsService/Invoice?patientPhoneNumber=${this.phoneNumber}`,
          {
            requestsCount: 1,
            referenceNumber: this.doctor_id,
          }
        );
        Logger.info('successConfirm', { result: data, id: this.id });
        this.payment_status = 'paid';
        await this.save();
        resolve(data);
      } catch (error) {
        Logger.error('errorConfirm', { error, id: this.id });
        reject(error);
      }
    });
  }
}

module.exports = CoronaTest;

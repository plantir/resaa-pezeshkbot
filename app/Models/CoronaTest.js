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
        let {
          data: { result },
        } = await axios.get(`${BASE_API}/Charge/${chargeRequestId}/Receipt`);
        this.trackingNumber = result.chargeReceipt.trackingNumber;
        await this.save();
        if (result.chargeReceipt.currentBalance < this.amount) {
          Logger.error('currentBalance', result);
          reject(result);
        } else if (result.chargeReceipt.status == 'Successful') {
          Logger.info('successCharge', result);
          this.chargeRequestId = chargeRequestId;
          resolve(result);
        } else {
          Logger.error('chargeNotSuccess', result);
          reject(result);
        }
      } catch (error) {
        Logger.error('chargeFail', error);
        reject(error);
      }
    });
  }
  confirmPayment() {
    return new Promise(async (resolve, reject) => {
      try {
        let { data } = await axios.post(
          `${BASE_API}/Doctors/${this.doctor_id}/DiagnosticDocumentsService/Invoice?patientPhoneNumber=${this.phoneNumber}`,
          {
            requestsCount: 1,
            referenceNumber: this.id,
          }
        );
        Logger.info('successConfirm', data);
        this.status = 'paid';
        await this.save();
        resolve(data);
      } catch (error) {
        Logger.error('errorConfirm', error);
        reject(error);
      }
    });
  }
}

module.exports = CoronaTest;

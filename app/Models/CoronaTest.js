'use strict';

/** @type {typeof import('@adonisjs/lucid/src/Lucid/Model')} */
const Model = use('BaseModel');

/** @type { import('axios')} */
const axios = use('axios');

/** @type { import('@adonisjs/framework/src/Env')} */
const Env = use('Env');

const BASE_API = Env.getOrFail('RESAA_API');

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
          reject(result);
        } else if (result.chargeReceipt.status == 'Successful') {
          this.chargeRequestId = chargeRequestId;
          resolve(result);
        } else {
          reject(result);
        }
      } catch (error) {
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
        this.status = 'paid';
        await this.save();
        resolve(data);
      } catch (error) {
        reject(error);
      }
    });
  }
}

module.exports = CoronaTest;

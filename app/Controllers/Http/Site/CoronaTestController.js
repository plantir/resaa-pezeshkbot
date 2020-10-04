'use strict';
const CoronaTest = use('App/Models/CoronaTest');
class CoronaTestController {
  async request({ request }) {
    let data = request.only(CoronaTest.allowField);
    return CoronaTest.create(data);
  }
  async callback({ request, response }) {
    let { chargeRequestId, request_id } = request.post();
    let coronaTest = await CoronaTest.find(request_id);
    if (coronaTest.payment_status !== 'paid') {
      try {
        await coronaTest.checkChargeRequest(chargeRequestId);
        await coronaTest.confirmPayment();
      } catch (error) {
        console.log(error);
      }
    }
    response.json(coronaTest.toJSON());
  }
  async tracking({ request }) {
    let { nationalCode, mobile } = request.get();
    return CoronaTest.query()
      .where({
        mobile,
        nationalCode,
      })
      .setVisible([
        'created_at',
        'status',
        'payment_status',
        'amount',
        'doctor_id',
      ])
      .where({ is_deleted: false })
      .fetch();
  }
}

module.exports = CoronaTestController;

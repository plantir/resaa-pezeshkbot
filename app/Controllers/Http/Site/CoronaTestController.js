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
    try {
      await coronaTest.checkChargeRequest(chargeRequestId);
      await coronaTest.confirmPayment();
    } catch (error) {
      console.log(error);
    }
    response.json(coronaTest);
  }
}

module.exports = CoronaTestController;

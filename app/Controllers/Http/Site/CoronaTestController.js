'use strict';

class CoronaTestController {
  constructor() {
    this.Model = use('App/Models/CoronaTest');
  }
  async show({ params: { id } }) {
    let test = await this.Model.query()
      .where({ id })
      .where({ is_deleted: false })
      .with('city')
      .firstOrFail();
    test.services =
      test.services &&
      test.services.filter((item) => item.prepay_amount && item.total_amount);
    return test;
  }
}

module.exports = CoronaTestController;

'use strict';

class CoronaTestController {
  constructor() {
    this.Model = use('App/Models/CoronaTest');
  }
  show({ params: { id } }) {
    return this.Model.query()
      .where({ id })
      .where({ is_deleted: false })
      .with('city')
      .firstOrFail();
  }
}

module.exports = CoronaTestController;

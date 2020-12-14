'use strict';

class CoronaServiceController {
  constructor() {
    this.Model = use('App/Models/CoronaService');
  }
  index() {
    return this.Model.query().where({ is_deleted: false }).fetch();
  }
  show({ params: { id } }) {
    return this.Model.query()
      .where({ id })
      .where({ is_deleted: false })
      .firstOrFail();
  }
}

module.exports = CoronaServiceController;

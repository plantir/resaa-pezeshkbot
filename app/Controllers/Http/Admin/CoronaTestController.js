'use strict';
const Resource = use('Resource');
class CoronaTestController extends Resource {
  constructor() {
    super();
    this.Model = use('App/Models/CoronaTest');
  }
}
module.exports = CoronaTestController;

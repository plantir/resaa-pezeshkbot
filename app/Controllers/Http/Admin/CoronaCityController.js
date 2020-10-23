'use strict';
const Resource = use('Resource');
class CoronaCityController extends Resource {
  constructor() {
    super();
    this.Model = use('App/Models/CoronaCity');
  }
}

module.exports = CoronaCityController;

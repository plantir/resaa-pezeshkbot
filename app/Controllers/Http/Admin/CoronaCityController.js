'use strict';
const Resource = use('Resource');
class CoronaCityController extends Resource {
  constructor() {
    super();
    this.Model = use('App/Models/City');
  }
}

module.exports = CoronaCityController;

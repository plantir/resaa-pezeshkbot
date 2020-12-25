'use strict';
const Resource = use('Resource');
class CityController extends Resource {
  constructor() {
    super();
    this.Model = use('App/Models/City');
  }
}

module.exports = CityController;

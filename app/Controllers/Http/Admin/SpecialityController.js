'use strict';
const Resource = use('Resource');

class SpecialityController extends Resource {
  constructor() {
    super();
    this.Model = use('App/Models/Speciality');
  }
}

module.exports = SpecialityController;

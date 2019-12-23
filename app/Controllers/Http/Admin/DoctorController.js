'use strict';
const Resource = use('Resource');

class DoctorController extends Resource {
  constructor() {
    super();
    this.Model = use('App/Models/Doctor');
  }
}

module.exports = DoctorController;

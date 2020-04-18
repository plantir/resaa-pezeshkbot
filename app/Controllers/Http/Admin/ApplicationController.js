'use strict';

const Resource = use('Resource');
class ApplicationController extends Resource {
  constructor() {
    super();
    this.Model = use('App/Models/Application');
  }
}

module.exports = ApplicationController;

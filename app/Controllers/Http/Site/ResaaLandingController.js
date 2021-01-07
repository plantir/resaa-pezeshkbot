'use strict';

class ResaaLandingController {
  constructor() {
    this.Model = use('App/Models/ResaaLanding');
  }
  async show({ params: { slug } }) {
    return this.Model.findByOrFail({ slug });
  }
}

module.exports = ResaaLandingController;

'use strict';

/** @typedef {import('@adonisjs/framework/src/Request')} Request */
/** @typedef {import('@adonisjs/framework/src/Response')} Response */
/** @typedef {import('@adonisjs/framework/src/View')} View */

/**
 * Resourceful controller for interacting with resaalandings
 */
const Resource = use('Resource');
class ResaaLandingController extends Resource {
  constructor() {
    super();
    this.Model = use('App/Models/ResaaLanding');
  }
}

module.exports = ResaaLandingController;

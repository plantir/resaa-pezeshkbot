'use strict';

/** @typedef {import('@adonisjs/framework/src/Request')} Request */
/** @typedef {import('@adonisjs/framework/src/Response')} Response */
/** @typedef {import('@adonisjs/framework/src/View')} View */

/**
 * Resourceful controller for interacting with prescripttests
 */
const Resource = use('Resource');
class PrescriptTestController extends Resource {
  constructor() {
    super();
    this.Model = use('App/Models/PrescriptTest');
  }
}

module.exports = PrescriptTestController;

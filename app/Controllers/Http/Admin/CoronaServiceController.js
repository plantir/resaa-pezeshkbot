'use strict';

/** @typedef {import('@adonisjs/framework/src/Request')} Request */
/** @typedef {import('@adonisjs/framework/src/Response')} Response */
/** @typedef {import('@adonisjs/framework/src/View')} View */

/**
 * Resourceful controller for interacting with coronaservices
 */
const Resource = use('Resource');
class CoronaServiceController extends Resource {
  constructor() {
    super()
    this.Model = use('App/Models/CoronaService');
  }
}

module.exports = CoronaServiceController;

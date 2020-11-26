'use strict';

/** @typedef {import('@adonisjs/framework/src/Request')} Request */
/** @typedef {import('@adonisjs/framework/src/Response')} Response */
/** @typedef {import('@adonisjs/framework/src/View')} View */

/**
 * Resourceful controller for interacting with labratories
 */
const Resource = use('Resource');
class CoronaLabratoryController extends Resource {
  constructor() {
    super();
    this.Model = use('App/Models/CoronaLabratory');
  }
}

module.exports = CoronaLabratoryController;

'use strict';

/** @typedef {import('@adonisjs/framework/src/Request')} Request */
/** @typedef {import('@adonisjs/framework/src/Response')} Response */
/** @typedef {import('@adonisjs/framework/src/View')} View */

/**
 * Resourceful controller for interacting with checkuptests
 */

const Resource = use('Resource');
class CheckupTestController extends Resource {
  constructor() {
    super();
    this.Model = use('App/Models/CheckupTest');
  }
}

module.exports = CheckupTestController;

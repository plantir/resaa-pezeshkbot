'use strict';

/** @typedef {import('@adonisjs/framework/src/Request')} Request */
/** @typedef {import('@adonisjs/framework/src/Response')} Response */
/** @typedef {import('@adonisjs/framework/src/View')} View */

const Resource = use('Resource');
class TransactionController extends Resource {
  constructor() {
    super();
    this.Model = use('App/Models/Transaction');
  }
}

module.exports = TransactionController;

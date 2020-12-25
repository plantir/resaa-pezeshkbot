'use strict';

/** @typedef {import('@adonisjs/framework/src/Request')} Request */
/** @typedef {import('@adonisjs/framework/src/Response')} Response */
/** @typedef {import('@adonisjs/framework/src/View')} View */

/**
 * Resourceful controller for interacting with samplers
 */
const Resource = use('Resource');
class SamplerController extends Resource {
  constructor() {
    super();
    this.Model = use('App/Models/Sampler');
  }
}

module.exports = SamplerController;

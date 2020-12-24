'use strict'

/** @typedef {import('@adonisjs/framework/src/Request')} Request */
/** @typedef {import('@adonisjs/framework/src/Response')} Response */
/** @typedef {import('@adonisjs/framework/src/View')} View */

/**
 * Resourceful controller for interacting with checkuplandings
 */
const Resource = use('Resource')
class CheckupLandingController extends Resource {
  constructor(){
    super()
    this.Model = use('App/Models/CheckupLanding')
  }

}

module.exports = CheckupLandingController

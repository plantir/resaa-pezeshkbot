'use strict';
const Resource = use('Resource');
class QuestionController extends Resource {
  constructor() {
    super();
    this.Model = use('App/Models/Question');
  }
}

module.exports = QuestionController;

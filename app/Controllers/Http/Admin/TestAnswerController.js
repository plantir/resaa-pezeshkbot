'use strict';
const Resource = use('Resource');
class TestAnswerController extends Resource {
  constructor() {
    super();
    this.Model = use('App/Models/TestAnswer');
  }
}

module.exports = TestAnswerController;

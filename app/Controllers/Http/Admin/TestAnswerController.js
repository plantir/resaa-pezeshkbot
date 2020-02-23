'use strict';
const Resource = use('Resource');
class TestAnswerController extends Resource {
  constructor() {
    super();
    this.Model = use('App/Models/TestAnswer');
  }
  async reply({ request, response, params: { id } }) {}
  async doctorAnswers({ request, response, params: { id } }) {
    let options = request.get();
    options.filters = options.filters ? JSON.parse(options.filters) : [];
    options.filters.push(`doctor:"subscriberNumber"%"${id}":like`);
    options.filters = JSON.stringify(options.filters);
    // listOption
    return this.Model.listOption(options);
  }
}
// {"id": "f87853af-42e6-4395-bd92-0497bbe8ca3a", "tags": [], "title": "دکتر", "gender": null, "chat_id": 96852497, "lastName": "میرجعفری", "expertise": null, "firstName": "امیرحسام", "imagePath": null, "specialty": {"id": 1, "title": "بیهوشی", "iconPath": "Doctors/MedicalSpecialties/1/Icon", "description": "Anesthesiology"}, "timetable": {"segments": [{"to": 2879, "from": 1440}, {"to": 4319, "from": 2880}, {"to": 5759, "from": 4320}, {"to": 7199, "from": 5760}, {"to": 8639, "from": 7200}, {"to": 10079, "from": 8640}, {"to": 1439, "from": 0}]}, "workplaces": [], "subscriberNumber": "6843", "currentlyAvailable": true, "medicalCouncilNumber": null, "providesDiagnosticDocumentsService": true}
module.exports = TestAnswerController;

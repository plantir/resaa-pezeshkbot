'use strict';
const fs = require('fs');
const Resource = use('Resource');
const bot = use('ResaaBot');
const Helpers = use('Helpers');
class TestAnswerController extends Resource {
  constructor() {
    super();
    this.Model = use('App/Models/TestAnswer');
  }
  // try {
  //   request.multipart.file('voice', {}, async file => {
  //     let { msg = {} } = request.post();
  //     if (file) {
  //       msg.voice = file.stream;
  //     }
  //     if (!msg || (!msg.text && !msg.voice)) {
  //       return response
  //         .status(500)
  //         .json('msg.text or a voice file is required');
  //     }
  //     await this.Model.reply(id, msg);
  //     return 'success';
  //   });
  //   await request.multipart.process();
  // } catch (error) {
  //   return response.status(500).send(error);
  // }
  async request({ request, response }) {
    let { doctor, price, files } = request.post();
    let user = {
      files,
    };
    try {
      let result = await this.Model.send({ doctor, user, price });
      await this.Model.query()
        .update({ is_confirm: true })
        .where({ id: result.tracking_code });
      return result;
    } catch (error) {
      return error;
    }
  }
  async reply({ request, response, params: { id } }) {
    let { msg = {} } = request.post();
    if (msg.text) {
      await this.Model.reply(id, msg);
      return response.send('success');
    }
    let voice = request.file('voice');
    if (!voice) {
      return response
        .status(500)
        .send('request must contain msg.text or attach a voice');
    }
    let name = `${Date.now()}.mp3`;
    await voice.move(Helpers.tmpPath('test_answer'), {
      name: name,
      overwrite: true,
    });
    msg.voice = `./tmp/test_answer/${name}`;
    await this.Model.reply(id, msg);
    return response.send('success');
  }
  async doctorAnswers({ request, response, params: { id } }) {
    let options = request.get();
    options.filters = options.filters ? JSON.parse(options.filters) : [];
    options.setHidden = ['doctor', 'user_id', 'is_deleted', 'doctor_chat_id'];
    options.filters.push(`doctor:"subscriberNumber"%"${id}":like`);
    options.filters = JSON.stringify(options.filters);
    return this.Model.listOption(options);
  }
}
// {"id": "f87853af-42e6-4395-bd92-0497bbe8ca3a", "tags": [], "title": "دکتر", "gender": null, "chat_id": 96852497, "lastName": "میرجعفری", "expertise": null, "firstName": "امیرحسام", "imagePath": null, "specialty": {"id": 1, "title": "بیهوشی", "iconPath": "Doctors/MedicalSpecialties/1/Icon", "description": "Anesthesiology"}, "timetable": {"segments": [{"to": 2879, "from": 1440}, {"to": 4319, "from": 2880}, {"to": 5759, "from": 4320}, {"to": 7199, "from": 5760}, {"to": 8639, "from": 7200}, {"to": 10079, "from": 8640}, {"to": 1439, "from": 0}]}, "workplaces": [], "subscriberNumber": "6843", "currentlyAvailable": true, "medicalCouncilNumber": null, "providesDiagnosticDocumentsService": true}
module.exports = TestAnswerController;

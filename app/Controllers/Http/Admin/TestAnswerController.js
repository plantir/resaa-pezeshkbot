'use strict';
const fs = require('fs');
const Resource = use('Resource');
const bot = use('ResaaBot');
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
  async reply({ request, response, params: { id } }) {
    try {
      let { msg = {} } = request.post();
      request.multipart.file('voice', {}, async file => {
        if (file) {
          let name = `./tmp/test_answer/${Date.now()}.mp3`;
          file.stream.pipe(fs.WriteStream(name)).on('finish', async () => {
            msg.voice = name;
            await this.Model.reply(id, msg);
            response.send('success');
          });
        } else {
          return response.status(500).send('voice not found');
        }
      });
      await request.multipart.process();
    } catch (error) {
      let { msg = {} } = request.post();
      if (!msg.text) {
        return response.status(500).send('msg.text not found');
      }
      await this.Model.reply(id, msg);
      response.send('success');
    }
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

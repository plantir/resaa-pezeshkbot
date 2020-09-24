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
module.exports = TestAnswerController;

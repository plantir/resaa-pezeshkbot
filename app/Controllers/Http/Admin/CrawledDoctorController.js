'use strict';

const { reject } = require('lodash');

/** @typedef {import('@adonisjs/framework/src/Request')} Request */
/** @typedef {import('@adonisjs/framework/src/Response')} Response */
/** @typedef {import('@adonisjs/framework/src/View')} View */
const Resource = use('Resource');
/** @type {import('fs')} */
const fs = use('fs');
/** @type {import('lodash')} */
const _ = use('lodash');

const CRAWLED_PATH = './tmp/crawled_doctors';
class CrawledDoctorController extends Resource {
  constructor() {
    super();
    this.Model = use('App/Models/CrawledDoctor');
  }

  async import({ request, response }) {
    request.multipart.file('file', {}, async (file) => {
      let data = await this._parseFile(file);
      let name = `${new Date().getTime()}.json`;
      fs.mkdirSync(CRAWLED_PATH, { recursive: true });
      fs.writeFile(
        `${CRAWLED_PATH}/${name}`,
        JSON.stringify(data),
        'utf8',
        (err) => {
          if (!err) console.log('The file has been saved!');
        }
      );
      let duplicate_items = await this.Model.query()
        .whereIn(
          'medicalCouncilNumber',
          data.map((item) => item.medicalCouncilNumber)
        )
        .countDistinct('medicalCouncilNumber as count');
      let duplicate_rows = duplicate_items[0].count;

      response.send({
        duplicate_rows,
        file: name,
        new_row_count: data.length - duplicate_rows,
      });
    });
    await request.multipart.process();
  }
  async importToDB({ request, response }) {
    let { file, prevent_duplicated } = request.post();
    try {
      let result = await this._readAndImport({ file, prevent_duplicated });
      return 'successfully created';
    } catch (error) {
      throw new Error(error);
    }
  }

  async show({ params: {id} }) {
    let item = await this.Model.findOrFail(id);
    await item.load('converted_doctor');
    return item;
  }
  _readAndImport({ file, prevent_duplicated }) {
    return new Promise((resolve, reject) => {
      fs.readFile(`${CRAWLED_PATH}/${file}`, 'utf8', async (err, file) => {
        if (err) reject('file not found please try upload file again');
        let data = JSON.parse(file);
        if (prevent_duplicated) {
          let duplicate_items = await this.Model.query()
            .select('medicalCouncilNumber')
            .whereIn(
              'medicalCouncilNumber',
              data.map((item) => item.medicalCouncilNumber)
            )
            .distinct('medicalCouncilNumber')
            .fetch();
          duplicate_items = duplicate_items
            .toJSON()
            .map((item) => item.medicalCouncilNumber);
          data = data.filter((item) => {
            return !duplicate_items.includes(item.medicalCouncilNumber);
          });
        }
        let trusted_data = data.map((item) =>
          _.pick(item, this.Model.allowField)
        );
        try {
          await this.Model.createMany(trusted_data);
        } catch (error) {
          reject(error);
        }
        resolve(true);
      });
    });
  }
  _convertToJSON(result) {
    var lines = result.split(/(\n|\r\n)/);
    lines = lines.filter((line) => line !== '\r\n' && line != '');
    var new_content = lines
      .map((line, i) => {
        return line + (i == lines.length - 1 ? '' : ',');
      })
      .join('\r\n');
    new_content = `[${new_content}]`;
    return JSON.parse(new_content);
  }
  _parseFile(file) {
    return new Promise((resolve, reject) => {
      let data = '';
      file.stream.on('data', (chunk) => {
        data += chunk;
      });
      file.stream.on('end', () => {
        let converted_data = this._convertToJSON(data.toString());
        resolve(converted_data);
      });
    });
  }
}

module.exports = CrawledDoctorController;

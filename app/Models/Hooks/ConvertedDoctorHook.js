'use strict';

const ConvertedDoctorHook = (exports = module.exports = {});
const axios = use('axios');
const fs = use('fs');
const Env = use('Env');
ConvertedDoctorHook.beforeSave = async (modelInstance) => {
  if (modelInstance.image) {
    if (!modelInstance.image.startsWith('/api/download/')) {
      try {
        let { data } = await axios.get(encodeURI(modelInstance.image), {
          responseType: 'stream',
        });
        let name = `./tmp/uploads/${new Date().getTime()}_original.${
          data.extname || 'jpg'
        }`;
        data.pipe(fs.createWriteStream(name));
        modelInstance.image =
          `${Env.get('APP_URL')}/download/` +
          name.replace('./tmp/uploads/', '');
      } catch (error) {
        console.log(error);
      }
    }
  }
};

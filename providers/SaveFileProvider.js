'use strict';

const { ServiceProvider } = require('@adonisjs/fold');
const fs = require('fs');
const sharp = require('sharp');
const sizes = [
  {
    size: [1000],
    name: 'big'
  },
  {
    size: [600],
    name: 'medium'
  },
  {
    size: [300],
    name: 'small'
  },
  {
    size: [300, 300],
    name: 'thumb'
  }
];
class SaveFileProvider extends ServiceProvider {
  /**
   * Register namespaces to the IoC container
   *
   * @method register
   *
   * @return {void}
   */
  register() {
    this.app.singleton('SaveFile', () => {
      const Env = this.app.use('Adonis/Src/Env');
      function _save(file, resize = true) {
        let name = `./tmp/uploads/${new Date().getTime()}_original.${file.extname ||
          'jpg'}`;
        let writeStrem = fs.WriteStream(name);
        file.stream.pipe(writeStrem).on('finish', file => {
          if (resize) {
            Promise.all(sizes.map(item => _resize(item, name))).then(() => {});
          }
        });
        let result =
          `${Env.get('APP_URL')}/download/` +
          name.replace('./tmp/uploads/', '');
        return result;
      }
      function _resize(item, name) {
        let new_name = name.replace('original', item.name);
        sharp(name)
          .resize(...item.size)
          .toFile(new_name);
      }
      return _save;
    });

    // this.app.alias('App/../providers/BotProvider.js', 'Bot');
  }

  /**
   * Attach context getter when all providers have
   * been registered
   *
   * @method boot
   *
   * @return {void}
   */
  boot() {}
}

module.exports = SaveFileProvider;

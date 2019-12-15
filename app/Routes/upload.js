const Route = use('Route');
const Helpers = use('Helpers');
const Env = use('Env');
const fs = use('fs');
const sharp = use('sharp');
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
Route.post('upload', async ({ request, response }) => {
  let resize = true;
  request.multipart.file('file', {}, async file => {
    let name = `./tmp/uploads/${new Date().getTime()}_original.${file.extname}`;
    let writeStrem = fs.WriteStream(name);
    file.stream.pipe(writeStrem).on('finish', file => {
      if (resize) {
        Promise.all(sizes.map(item => _resize(item, name))).then(() => {});
      }
    });
    let result =
      `${Env.get('APP_URL')}/download/` + name.replace('./tmp/uploads/', '');
    response.send(result);
  });
  await request.multipart.process();
});

Route.get('download/:fileId', async ({ params, response }) => {
  response.download(Helpers.tmpPath(`uploads/${params.fileId}`));
});

function _resize(item, name) {
  let new_name = name.replace('original', item.name);
  sharp(name)
    .resize(...item.size)
    .toFile(new_name);
}

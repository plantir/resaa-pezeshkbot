const Route = use('Route');
const Helpers = use('Helpers');
const SaveFile = use('SaveFile');

Route.post('upload', async ({ request, response }) => {
  request.multipart.file('file', {}, async file => {
    let result = SaveFile(file);
    response.send(result);
  });
  await request.multipart.process();
});

Route.get('download/:fileId', async ({ params, response }) => {
  response.download(Helpers.tmpPath(`uploads/${params.fileId}`));
});

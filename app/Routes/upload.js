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
Route.post('upload_voice', async ({ request, response }) => {
  request.multipart.file('voice', {}, async file => {
    let result = SaveFile(file, false);
    response.send(result.replace('/api', ''));
  });
  await request.multipart.process();
});
Route.get('download/test_answer/:fileId', async ({ params, response }) => {
  response.download(Helpers.tmpPath(`test_answer/${params.fileId}`));
});

Route.get('download/:fileId', async ({ params, response }) => {
  response.download(Helpers.tmpPath(`uploads/${params.fileId}`));
});

/** @type {typeof import('@adonisjs/framework/src/Route/Manager')} */
const Route = use('BaseRoute');

// route for test-answer
Route.group(() => {
  Route.customResource('', 'TestAnswerController');
  Route.post('/:id/reply', 'TestAnswerController.reply');
  Route.get('/doctor/:id', 'TestAnswerController.doctorAnswers');
})
  .namespace('Admin')
  .prefix('admin/test_answer')
  .middleware(['auth', 'role:administrator,corona_admin']);

Route.group(() => {
  Route.post('/request', 'TestAnswerController.request');
})
  .namespace('Admin')
  .prefix('test_answer')
  .middleware(['auth', 'role:administrator,corona_admin']);

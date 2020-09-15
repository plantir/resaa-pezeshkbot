/** @type {typeof import('@adonisjs/framework/src/Route/Manager')} */
const Route = use('BaseRoute');

// route for quiz
Route.group(() => {
  Route.customResource('', 'QuizController');
  Route.post(':id/send_test', 'QuizController.send_test');
})
  .namespace('Admin')
  .prefix('admin/quiz')
  .middleware(['auth', 'role:administrator,bot_admin']);

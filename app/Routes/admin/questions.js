/** @type {typeof import('@adonisjs/framework/src/Route/Manager')} */
const Route = use('BaseRoute');

// route for question
Route.group(() => {
  Route.customResource('', 'QuestionController');
})
  .namespace('Admin')
  .prefix('admin/questions')
  .middleware(['auth', 'role:administrator,bot_admin']);

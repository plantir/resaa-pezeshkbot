/** @type {typeof import('@adonisjs/framework/src/Route/Manager')} */
const Route = use('BaseRoute');

// route for question
Route.group(() => {
  Route.get('', 'QuestionController.index');
})
  .namespace('Admin')
  .prefix('admin/questions')
  .middleware(['auth', 'role:administrator,bot_admin']);

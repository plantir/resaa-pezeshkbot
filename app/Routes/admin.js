/** @type {typeof import('@adonisjs/framework/src/Route/Manager')} */
const Route = use('BaseRoute');
Route.get('', ({ view }) => {
  return 'Success';
});

Route.group(() => {
  Route.get('', 'QuestionController.index');
})
  .namespace('Admin')
  .prefix('admin/questions')
  .middleware('auth');

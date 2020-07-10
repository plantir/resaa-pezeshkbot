/** @type {typeof import('@adonisjs/framework/src/Route/Manager')} */
const Route = use('BaseRoute');

// route for doctors
Route.group(() => {
  Route.customResource('', 'CoronaTestController');
})
  .namespace('Admin')
  .prefix('admin/corona_test')
  .middleware('auth');

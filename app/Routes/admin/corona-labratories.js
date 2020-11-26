/** @type {typeof import('@adonisjs/framework/src/Route/Manager')} */
const Route = use('BaseRoute');

// route for doctors
Route.group(() => {
  Route.customResource('', 'CoronaLabratoryController');
})
  .namespace('Admin')
  .prefix('admin/corona-labratories')
  .middleware(['auth', 'role:administrator,corona_admin']);

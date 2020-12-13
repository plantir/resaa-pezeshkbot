/** @type {typeof import('@adonisjs/framework/src/Route/Manager')} */
const Route = use('BaseRoute');

// route for doctors
Route.group(() => {
  Route.customResource('', 'CoronaServiceController');
})
  .namespace('Admin')
  .prefix('admin/corona-services')
  .middleware(['auth', 'role:administrator,corona_admin']);

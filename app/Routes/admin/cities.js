/** @type {typeof import('@adonisjs/framework/src/Route/Manager')} */
const Route = use('BaseRoute');

// route for doctors
Route.group(() => {
  Route.customResource('', 'CityController');
})
  .namespace('Admin')
  .prefix('admin/cities')
  .middleware(['auth', 'role:administrator,corona_admin,experiment_admin']);

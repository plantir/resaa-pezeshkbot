/** @type {typeof import('@adonisjs/framework/src/Route/Manager')} */
const Route = use('BaseRoute');

// route for doctors
Route.group(() => {
  Route.customResource('', 'CoronaCityController');
})
  .namespace('Admin')
  .prefix('admin/corona_cities')
  .middleware(['auth', 'role:administrator,corona_admin']);

/** @type {typeof import('@adonisjs/framework/src/Route/Manager')} */
const Route = use('BaseRoute');

// route for doctors
Route.group(() => {
  Route.customResource('', 'CoronaSamplerController');
})
  .namespace('Admin')
  .prefix('admin/corona-samplers')
  .middleware(['auth', 'role:administrator,corona_admin']);

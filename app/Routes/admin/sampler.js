/** @type {typeof import('@adonisjs/framework/src/Route/Manager')} */
const Route = use('BaseRoute');

// route for doctors
Route.group(() => {
  Route.customResource('', 'SamplerController');
})
  .namespace('Admin')
  .prefix('admin/samplers')
  .middleware(['auth', 'role:administrator,corona_admin,experiment_admin']);

/** @type {typeof import('@adonisjs/framework/src/Route/Manager')} */
const Route = use('BaseRoute');

// route for doctors
Route.group(() => {
  Route.customResource('', 'ResaaLandingController');
})
  .namespace('Admin')
  .prefix('admin/resaa-landings')
  .middleware(['auth', 'role:administrator']);

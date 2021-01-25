/** @type {typeof import('@adonisjs/framework/src/Route/Manager')} */
const Route = use('BaseRoute');

// route for doctors
Route.group(() => {
  Route.get(':path', 'BadgeController.getBadge');
})
  .namespace('Admin')
  .prefix('admin/badges')
  .middleware(['auth', 'role:administrator,experiment_admin,corona_admin']);

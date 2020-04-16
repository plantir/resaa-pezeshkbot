/** @type {typeof import('@adonisjs/framework/src/Route/Manager')} */
const Route = use('BaseRoute');

// route for doctors
Route.group(() => {
  Route.customResource('', 'ReservationController');
})
  .namespace('Admin')
  .prefix('admin/reservations')
  .middleware('auth');

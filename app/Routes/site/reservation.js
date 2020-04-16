/** @type {typeof import('@adonisjs/framework/src/Route/Manager')} */
const Route = use('BaseRoute');

// route for doctors
Route.group(() => {
  Route.post('', 'ReservationController.store');
})
  .namespace('Site')
  .prefix('reservations');

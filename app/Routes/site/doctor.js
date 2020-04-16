/** @type {typeof import('@adonisjs/framework/src/Route/Manager')} */
const Route = use('BaseRoute');

// route for doctors
Route.group(() => {
  Route.get(':id', 'DoctorController.show');
  Route.get(':id/timeTable', 'DoctorController.timeTable');
  Route.get('', 'DoctorController.query');
})
  .namespace('Site')
  .prefix('doctors');

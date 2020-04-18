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

Route.group(() => {
  Route.get('Android/info-files.php', 'DoctorController.version_list');
  Route.get('Android/:version', 'DoctorController.version_info');
})
  .namespace('Site')
  .prefix('doctor');

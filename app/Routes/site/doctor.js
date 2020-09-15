/** @type {typeof import('@adonisjs/framework/src/Route/Manager')} */
const Route = use('BaseRoute');

Route.group(() => {
  Route.get('Android/info-files.php', 'DoctorController.version_list');
  Route.get('Android/:version', 'DoctorController.version_info');
})
  .namespace('Site')
  .prefix('doctor');

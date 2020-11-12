/** @type {typeof import('@adonisjs/framework/src/Route/Manager')} */
const Route = use('BaseRoute');

// route for doctors
Route.group(() => {
  Route.customResource('', 'ConvertedDoctorController');
})
  .namespace('Admin')
  .prefix('admin/converted-doctors')
  .middleware(['auth', 'role:administrator,crawl_admin']);

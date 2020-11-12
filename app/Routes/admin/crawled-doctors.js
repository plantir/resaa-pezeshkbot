/** @type {typeof import('@adonisjs/framework/src/Route/Manager')} */
const Route = use('BaseRoute');

// route for doctors
Route.group(() => {
  Route.customResource('', 'CrawledDoctorController');
  Route.post('import', 'CrawledDoctorController.import');
  Route.post('importToDB', 'CrawledDoctorController.importToDB');
})
  .namespace('Admin')
  .prefix('admin/crawled-doctors')
  .middleware(['auth', 'role:administrator,crawl_admin']);

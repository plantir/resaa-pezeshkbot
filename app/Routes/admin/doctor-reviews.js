/** @type {typeof import('@adonisjs/framework/src/Route/Manager')} */
const Route = use('BaseRoute');

// route for doctors
Route.group(() => {
  Route.customResource('', 'DoctorReviewController');
})
  .namespace('Admin')
  .prefix('admin/doctor-reviews')
  .middleware('auth');

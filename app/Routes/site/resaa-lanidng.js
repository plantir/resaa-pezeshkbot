/** @type {typeof import('@adonisjs/framework/src/Route/Manager')} */
const Route = use('BaseRoute');

// route for doctors
Route.group(() => {
  Route.get(':slug', 'ResaaLandingController.show');
})
  .namespace('Site')
  .prefix('/resaa-landings');

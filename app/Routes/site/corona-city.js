/** @type {typeof import('@adonisjs/framework/src/Route/Manager')} */
const Route = use('BaseRoute');

// route for doctors
Route.group(() => {
  Route.get('', 'CoronaCityController.index');
  Route.get(':city_id/tests', 'CoronaCityController.tests');
})
  .namespace('Site')
  .prefix('corona-cities');

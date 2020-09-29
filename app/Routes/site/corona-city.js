/** @type {typeof import('@adonisjs/framework/src/Route/Manager')} */
const Route = use('BaseRoute');

// route for doctors
Route.group(() => {
  Route.get('', 'CoronaCityController.index');
})
  .namespace('Site')
  .prefix('corona_cities');

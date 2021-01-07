/** @type {typeof import('@adonisjs/framework/src/Route/Manager')} */
const Route = use('BaseRoute');
Route.group(() => {
  Route.get('cities', 'CheckupController.cities');
  Route.get('tests', 'CheckupController.tests');
  Route.get('/landing/:slug', 'CheckupController.landing');
  Route.get(':id', 'CheckupController.show');
})
  .prefix('checkups')
  .namespace('Site');

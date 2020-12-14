/** @type {typeof import('@adonisjs/framework/src/Route/Manager')} */
const Route = use('BaseRoute');

// route for doctors
Route.group(() => {
  Route.get('', 'CoronaServiceController.index');
})
  .namespace('Site')
  .prefix('/corona-services');

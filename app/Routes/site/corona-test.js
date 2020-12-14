/** @type {typeof import('@adonisjs/framework/src/Route/Manager')} */
const Route = use('BaseRoute');

// route for doctors
Route.group(() => {
  Route.get(':id', 'CoronaTestController.show');
})
  .namespace('Site')
  .prefix('corona-tests');

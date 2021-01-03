/** @type {typeof import('@adonisjs/framework/src/Route/Manager')} */
const Route = use('BaseRoute');
Route.group(() => {
  Route.get('insurances', 'PrescriptingController.insurances');
  Route.get('cities', 'PrescriptingController.cities');
  Route.get('tests', 'PrescriptingController.tests');
  Route.post('order', 'PrescriptingController.createOrder');
})
  .prefix('prescripting')
  .namespace('Site');

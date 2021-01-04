/** @type {typeof import('@adonisjs/framework/src/Route/Manager')} */
const Route = use('BaseRoute');
Route.group(() => {
  Route.get('insurances', 'PrescriptingController.insurances');
  Route.get('cities', 'PrescriptingController.cities');
  Route.get('tests', 'PrescriptingController.tests');
  Route.post('order', 'PrescriptingController.createOrder');
  Route.get('orders/:guid', 'PrescriptingController.showOrder');
  Route.post('orders/callback', 'PrescriptingController.callback');
  Route.post('orders/:guid/paymentRequest', 'CheckupOrderController.paymentRequest');
})
  .prefix('prescripting')
  .namespace('Site');

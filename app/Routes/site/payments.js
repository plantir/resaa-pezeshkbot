/** @type {typeof import('@adonisjs/framework/src/Route/Manager')} */
const Route = use('BaseRoute');
Route.group(() => {
  Route.post('callback', 'PaymentController.callback');
})
  .prefix('payments')
  .namespace('Site');

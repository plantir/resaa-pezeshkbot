/** @type {typeof import('@adonisjs/framework/src/Route/Manager')} */
const Route = use('BaseRoute');
Route.group(() => {
  Route.post('/check', 'CoronaDiscountController.check');
})
  .prefix('corona-discounts')
  .namespace('Site');

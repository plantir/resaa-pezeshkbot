require('./state/start');
require('./state/refer');
require('./state/register_doctor');
require('./state/specialities');
require('./state/ask_question');
require('./state/quiz');
require('./state/doctor_answer');
// require('./state/back');
// require('./state/contactus');

// bot.sendMessage('@test_resaa', 'hi betch', {
//   reply_markup: {
//     inline_keyboard: [
//       [
//         {
//           text: 'پرتقال',
//           callback_data: 'پرتقال'
//         },
//         {
//           text: 'سیب',
//           callback_data: 'سیب'
//         }
//       ]
//     ]
//   }
// });
// bot.on('callback_query', callback => {
//   bot.sendMessage(callback.from.id, `جواب شما ${callback.data}`);

//   console.log(callback);
// });

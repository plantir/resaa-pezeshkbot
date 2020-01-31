const Bull = use('Rocketseat/Bull');
const Env = use('Env');
const BULL_UI_PORT = Env.get('BULL_UI_PORT', 9999);
Bull.process().ui(BULL_UI_PORT); // http://localhost:9999
// You don't need to specify the port, the default number is 9999

'use strict';
const path = use('path');
/*
|--------------------------------------------------------------------------
| Providers
|--------------------------------------------------------------------------
|
| Providers are building blocks for your Adonis app. Anytime you install
| a new Adonis specific package, chances are you will register the
| provider here.
|
*/
const providers = [
  '@adonisjs/framework/providers/AppProvider',
  '@adonisjs/auth/providers/AuthProvider',
  '@adonisjs/bodyparser/providers/BodyParserProvider',
  '@adonisjs/cors/providers/CorsProvider',
  '@adonisjs/lucid/providers/LucidProvider',
  '@adonisjs/redis/providers/RedisProvider',
  '@adonisjs/framework/providers/ViewProvider',
  'adonis-scheduler/providers/SchedulerProvider',
  'vrwebdesign-adonis/BaseModel/providers/BaseModelProvider',
  'vrwebdesign-adonis/BaseRoute/providers/BaseRouteProvider',
  'vrwebdesign-adonis/Helper/providers/HelperProvider',
  'vrwebdesign-adonis/Providers/kue/providers/KueProvider',
  'vrwebdesign-adonis/Providers/sms',
  path.join(__dirname, '..', 'providers', 'BotProvider')
];
/*
|--------------------------------------------------------------------------
| Ace Providers
|--------------------------------------------------------------------------
|
| Ace providers are required only when running ace commands. For example
| Providers for migrations, tests etc.
|
*/
const aceProviders = [
  '@adonisjs/lucid/providers/MigrationsProvider',
  'adonis-scheduler/providers/CommandsProvider',
  'vrwebdesign-adonis/Providers/kue/providers/CommandsProvider'
];

/*
|--------------------------------------------------------------------------
| Aliases
|--------------------------------------------------------------------------
|
| Aliases are short unique names for IoC container bindings. You are free
| to create your own aliases.
|
| For example:
|   { Route: 'Adonis/Src/Route' }
|
*/
const aliases = {
  Scheduler: 'Adonis/Addons/Scheduler'
};

/*
|--------------------------------------------------------------------------
| Commands
|--------------------------------------------------------------------------
|
| Here you store ace commands for your package
|
*/
const commands = [
  // 'vrwebdesign-adonis/Providers/kue/providers/CommandsProvider'
];
const jobs = ['vrwebdesign-adonis/Jobs/Sms'];
module.exports = { providers, aceProviders, aliases, commands, jobs };

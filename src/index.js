import Bot from './controllers/Bot';

import Router from './Router';

import './index.scss';

const routes = [{
  url: '/chatbot',
  controller: Bot
}];

new Router(routes);

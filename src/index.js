import Chat from './controllers/Chat';
import Router from './Router';
import './index.scss';

const routes = [{
  url: '/',
  controller: Chat
}];

new Router(routes);

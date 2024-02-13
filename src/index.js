import Search from './controllers/Search';

import Router from './Router';

import './index.scss';

const routes = [{
  url: '/search',
  controller: Search
}];

new Router(routes);

import Page404 from './controllers/Page404';

const Router = class {
  constructor(routes = []) {
    this.path = window.location.pathname;
    this.routes = routes;
    this.params = !window.location.search ? {} : Object.fromEntries(
      window.location.search
        .split('?')[1]
        .split('&')
        .map((param) => param.split('='))
    );

    this.run();
  }

  startController() {
    let ifExist = false;

    for (let i = 0; i < this.routes.length; i += 1) {
      const route = this.routes[i];

      if (route.url === this.path) {
        const Controller = route.controller;

        new Controller(this.params);
        ifExist = true;
        break;
      }
    }

    if (!ifExist) {
      new Page404();
    }
  }

  run() {
    this.startController();
  }
};

export default Router;

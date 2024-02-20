// import axios from 'axios';

import viewEntry from '../views/entry';
import viewNav from '../views/nav';
import viewBots from '../views/bots';

const Bot = class {
  constructor() {
    this.el = document.querySelector('#root');

    this.run();
  }

  render() {
    return `
        ${viewNav()}
        <div class="chatbot">
          <div class="chat-list">
            ${viewBots(this.bot)} 
          </div>
          ${viewEntry()}
        </div>
    `;
  }

  run() {
    this.el.innerHTML = this.render();
  }
};

export default Bot;

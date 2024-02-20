// import axios from 'axios';

import viewEntry from '../views/entry';
import viewNav from '../views/nav';
import viewBots from '../views/bots';

const Bot = class {
  constructor() {
    this.el = document.querySelector('#root');
    this.botList = [{
      title: 'Bot I',
      description: 'description du chatbot',
      statue: true
    }, {
      title: 'Bot II',
      description: 'description du chatbot',
      statue: false
    }, {
      title: 'Bot III',
      description: 'description du chatbot',
      statue: true
    }, {
      title: 'Bot IV',
      description: 'description du chatbot',
      statue: true
    }];
    this.run();
  }

  render() {
    return `
        ${viewNav()}
        <div class="chatbot">
          <div class="chat-list">
            ${this.botList.map((bot) => viewBots(bot)).join('')}
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

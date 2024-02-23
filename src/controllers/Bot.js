// import axios from 'axios';

import Message from './Message';
import viewMessage from '../views/message';
import viewEntry from '../views/entry';
import viewNav from '../views/nav';
import viewBots from '../views/bots';

const Bot = class {
  constructor() {
    this.el = document.querySelector('#root');
    this.botList = [{
      index: 1,
      title: 'Bot I',
      description: 'description du chatbot',
      statut: true
    }, {
      index: 2,
      title: 'Bot II',
      description: 'description du chatbot',
      statut: false
    }, {
      index: 3,
      title: 'Bot III',
      description: 'description du chatbot',
      statut: true
    }, {
      index: 4,
      title: 'Bot IV',
      description: 'description du chatbot',
      statut: true
    }];
    this.run();
  }

  scrollBottom() {
    document.addEventListener('DOMContentLoaded', () => {
      const messageDiv = document.querySelector('.message');
      messageDiv.scrollTop = messageDiv.scrollHeight;
    });
  }

  render() {
    return `
        ${viewNav()}
        <div class="chatbot">
          <div class="chat-list">
            ${this.botList.map((bot) => viewBots(bot)).join('')}
          </div>
          ${viewMessage()}
          ${viewEntry()}
        </div>
    `;
  }

  run() {
    this.el.innerHTML = this.render();
    this.scrollBottom();
    new Message();
  }
};

export default Bot;

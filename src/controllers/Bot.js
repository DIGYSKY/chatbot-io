// import axios from 'axios';

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
    this.bot = 1;
    this.run();
  }

  scrollBottom() {
    document.addEventListener('DOMContentLoaded', () => {
      const messageDiv = document.querySelector('.message');
      messageDiv.scrollTop = messageDiv.scrollHeight;
    });
  }

  getTime() {
    const dateDebut = new Date('2000-01-01');
    const dateActuelle = new Date();
    const differenceEnMillisecondes = dateActuelle.getTime() - dateDebut.getTime();
    const secondesDepuis2000 = Math.floor(differenceEnMillisecondes / 1000);

    return secondesDepuis2000;
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
    this.scrollBottom();
  }
};

export default Bot;

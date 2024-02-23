import botList from '../data/botsList';
import viewMessage from '../views/message';
import viewEntry from '../views/entry';
import viewNav from '../views/nav';
import viewBots from '../views/bots';
import viewPopup from '../views/popup';

const Chat = class {
  constructor() {
    this.el = document.querySelector('#root');
    this.botList = botList;
    this.run();
  }

  scrollBottom() {
    document.addEventListener('DOMContentLoaded', () => {
      const messageDiv = document.querySelector('.message');
      messageDiv.scrollTop = messageDiv.scrollHeight;
    });
  }

  inputMessage() {
    const form = document.getElementById('imput-user');

    form.addEventListener('submit', (event) => {
      event.preventDefault();

      const messageValue = document.getElementById('message-user').value;
      const elMessageInput = document.getElementById('message-user');
      const elMessageBox = document.querySelector('.message');

      if (messageValue !== '') {
        elMessageInput.value = '';
        this.addMessage(0, messageValue);
        // this.saveMessage(0, messageValue);
        elMessageBox.scrollTop = elMessageBox.scrollHeight;
      }
    });
  }

  addMessage(who, message) {
    const messageBox = document.getElementById('message-box');

    if (who === 0) {
      messageBox.innerHTML += `
        <div class="user-message">
          <p>${message}</p>
        </div>
      `;
    } else if (who === 1) {
      messageBox.innerHTML += `
        <div class="bot-message">
          <p>${message}</p>
        </div>
      `;
    }
  }

  showBotPopup() {
    document.addEventListener('DOMContentLoaded', () => {
      const button = document.querySelector('.button-bot');
      const popupContent = document.querySelector('.popup');
      const closeButton = document.querySelector('.close-button');
      button.addEventListener('click', () => {
        popupContent.style.display = 'block';
      });
      closeButton.addEventListener('click', () => {
        popupContent.style.display = 'none';
      });
    });
  }

  render() {
    return (`
        ${viewNav()}
        <div class="chatbot">
          <div class="chat-list">
            ${this.botList.map((bot) => viewBots(bot)).join('')}
          </div>
          ${viewMessage()}
          ${viewEntry()}
          ${viewPopup()}
        </div>
    `);
  }

  run() {
    this.el.innerHTML = this.render();
    this.scrollBottom();
    this.inputMessage();
    this.showBotPopup();
  }
};

export default Chat;

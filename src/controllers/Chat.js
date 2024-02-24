import botAction from '../data/action';
import botList from '../data/botsList';
import viewMessage from '../views/message';
import viewEntry from '../views/entry';
import viewNav from '../views/nav';
import viewBots from '../views/bots';
import viewPopup from '../views/popup';

const Chat = class {
  constructor() {
    this.el = document.querySelector('#root');
    this.botAction = botAction;
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
        this.botRespons(messageValue.toLowerCase().normalize('NFD').replace(/[\u0300-\u036f]/g, ''));
        elMessageBox.scrollTop = elMessageBox.scrollHeight;
      }
    });
  }

  addMessage(who, message) {
    const messageBox = document.getElementById('message-box');
    const newMessage = (`
    <div class="${who === 0 ? 'user-message' : 'bot-message'}">
      <p>${message}</p>
    </div>
  `);
    messageBox.innerHTML += newMessage;
  }

  botRespons(wordList) {
    const matchWord = [];
    const wordListSplit = wordList.split(' ');
    this.botAction.forEach((action) => {
      action.keyWord.forEach((wordB) => {
        wordListSplit.forEach((wordA) => {
          if (wordA === wordB) {
            matchWord.push({ word: wordB, perc: 200 });
          } else if (action.accordCocordence) {
            const distWordA = wordA.length;
            const distWordB = wordB.length;
            let matchLetters = 0;
            let matchErrors = 0;

            for (let i = 0; i < distWordA; i += 1) {
              for (let j = 0; j < distWordB; j += 1) {
                if (wordA[i] === wordB[j]
                  && wordA[i] !== ' '
                  && ((wordA[i + 1] === wordB[j + 1] && wordA[i + 2] === wordB[j + 2])
                  || (wordA[i - 1] === wordB[j - 1] && wordA[i - 2] === wordB[j - 2]))) {
                  matchLetters += 1;
                  break;
                } else if (matchErrors <= distWordB && wordA[i] !== ' ') {
                  matchErrors += 0.1;
                }
              }
            }

            const percentageMatch = (matchLetters / distWordB) * 100;
            const percentageErrors = (matchErrors / distWordB) * 100;

            if (percentageMatch > percentageErrors) {
              matchWord.push({
                word: wordB,
                perc: action.name === 'Insultes' ? 300 : percentageMatch
              });
            }
          }
        });
      });
    });

    if (matchWord.length) {
      let maxMatch = 0;
      let maxMatchWord = '';

      matchWord.forEach((wordObj) => {
        if (wordObj.perc > maxMatch) {
          maxMatch = wordObj.perc;
          maxMatchWord = wordObj.word;
        }
      });

      this.botAction.forEach((actionList) => {
        actionList.keyWord.forEach((wordAction) => {
          if (maxMatchWord === wordAction) {
            this.addMessage(actionList.who, actionList.action());
          }
        });
      });
    }

    if (!matchWord.length) {
      this.addMessage('general', "Je n'ai pas compris !");
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

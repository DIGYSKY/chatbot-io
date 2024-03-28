import axios from 'axios';
import botAction from '../data/action';
import botList from '../data/botsList';
import viewMessage from '../views/message';
import viewEntry from '../views/entry';
import viewNav from '../views/nav';
import viewBots from '../views/bots';

const Chat = class {
  constructor() {
    this.el = document.querySelector('#root');
    this.botAction = botAction;
    this.botList = botList;
    this.history = [];
    this.apiLinks = 'http://localhost:81';
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
        this.botRespons(messageValue.toLowerCase().normalize('NFD').replace(/[\u0300-\u036f]/g, ''));
        elMessageBox.scrollTop = elMessageBox.scrollHeight;
      }
    });
  }

  addMessage(who, message, pushToHistory = true, date = false) {
    const messageBox = document.getElementById('message-box');
    const bot = [];
    if (who !== 0) {
      this.botList.forEach((thisBot) => {
        if (thisBot.index === who) {
          bot.push(thisBot);
        }
      });
    }

    const messageDate = !date ? this.getDate() : date;

    const newMessage = (`
      <div class="${who !== 0 ? 'name-bot' : 'name-user'}">
        ${who !== 0 ? `<img src="${bot[0].img}" class="" alt="...">` : ''}
        ${who !== 0 ? `<p>| ${bot[0].title}</p>` : '<p>Vous</p>'}
      </div>
      <div class="${who === 0 ? 'user-message' : 'bot-message'}">
        ${message}
      </div>
      <div class="${who === 0 ? 'user-chrono' : 'bot-chorno'}">
        <p>${messageDate}</p>
      </div>
    `);

    if (pushToHistory) {
      const messageHistory = {
        who,
        message,
        date: messageDate
      };

      this.pushToHistory(messageHistory);
    }

    messageBox.innerHTML += newMessage;
  }

  getDate() {
    const date = new Date();
    const joursSemaine = ['Dim', 'Lun', 'Mar', 'Mer', 'Jeu', 'Ven', 'Sam'];
    const jourSemaineAbbr = joursSemaine[date.getDay()];
    const jour = (date.getDate() < 10) ? `0${date.getDate()}` : date.getDate();
    const mois = ((date.getMonth() + 1) < 10) ? `0${date.getMonth() + 1}` : date.getMonth() + 1;
    const annee = date.getFullYear();
    const heures = (date.getHours() < 10) ? `0${date.getHours()}` : date.getHours();
    const minutes = (date.getMinutes() < 10) ? `0${date.getMinutes()}` : date.getMinutes();
    const displayDate = `${jourSemaineAbbr}. ${heures}:${minutes} ${jour}/${mois}/${annee}`;

    return displayDate;
  }

  botRespons(wordList) {
    const matchWord = [];
    const wordListSplit = wordList.split(' ');
    this.botAction.forEach((action) => {
      action.keyWord.forEach((wordB) => {
        wordListSplit.forEach((wordA) => {
          const distWordA = wordA.length;
          const distWordB = wordB.length;
          const diffWord = Math.abs(distWordA - distWordB);

          if (wordA === wordB) {
            matchWord.push({ word: wordB, perc: 200 });
          } else if (action.accordCocordence && diffWord <= 3) {
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

            if (percentageMatch > percentageErrors && percentageMatch >= 30) {
              matchWord.push({
                word: wordB,
                perc: percentageMatch
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
            this.addMessage(actionList.who, actionList.action(), actionList.history);
          }
        });
      });
    }

    if (!matchWord.length) {
      this.addMessage('all', "Je n'ai pas compris !");
    }
  }

  async apiChatBot(root, params = '') {
    try {
      const res = await axios.get(`${this.apiLinks}/${root}/${params}`);
      return res.data;
    } catch (error) {
      return [];
    }
  }

  showBotPopup() {
    document.addEventListener('DOMContentLoaded', () => {
      const togglePopup = (button) => {
        const popupContent = button.nextElementSibling;
        popupContent.style.display = popupContent.style.display === 'block' ? 'none' : 'block';
      };
      const buttons = document.querySelectorAll('.button-bot');
      buttons.forEach((button) => {
        button.addEventListener('click', () => togglePopup(button));
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
          ${viewEntry()}}
        </div>
    `);
  }

  pushToHistoryNoAPI(message) {
    const historyJSON = localStorage.getItem('messageHistory');
    const history = JSON.parse(historyJSON) || [];

    history.push(message);

    const pushHistoryJSON = JSON.stringify(history);

    localStorage.setItem('messageHistory', pushHistoryJSON);
  }

  pushToHistory(message) {
    axios.put(`${this.apiLinks}/messages`, message)
      .then((response) => {
        console.log('Réponse du serveur :', response.data);
      })
      .catch((error) => {
        console.error('Erreur lors de l\'envoi des données :', error);
      });
  }

  renderHistory() {
    const historyJSON = localStorage.getItem('messageHistory');
    const history = JSON.parse(historyJSON) || [];
    const pushToHistory = false;

    history.forEach((message) => {
      this.addMessage(message.who, message.message, pushToHistory, message.date);
    });
  }

  async renderHistoryAPI() {
    const history = await this.apiChatBot('messages');
    const pushToHistory = false;

    history.forEach((message) => {
      this.addMessage(message.who, message.message, pushToHistory, message.date);
    });
  }

  run() {
    this.el.innerHTML = this.render();
    this.scrollBottom();
    this.inputMessage();
    this.showBotPopup();
    // this.renderHistory();
    this.renderHistoryAPI();
  }
};

export default Chat;

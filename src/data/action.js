export default [
  {
    name: 'Bonjour',
    accordCocordence: true,
    history: true,
    who: 'all',
    description: 'Dire bonjour aux bots',
    keyWord: ['bonjour', 'hello', 'salut'],
    action: () => ('Bonjour !')
  }, {
    name: 'Clear',
    accordCocordence: false,
    history: false,
    who: 'all',
    description: 'Supprimer les messages',
    keyWord: ['clear'],
    action: () => {
      const messageBox = document.getElementById('message-box');
      messageBox.innerHTML = '';

      localStorage.removeItem('messageHistory');

      return ('Messages supprimer !');
    }
  }, {
    name: 'Insultes',
    accordCocordence: true,
    history: true,
    who: 'all',
    description: 'Dire bonjour aux bots',
    keyWord: ['connard', 'fdp', 'pute', 'salope', 'enculer', 'pouilleux'],
    action: () => ('Les insultes ne pas acceptable !')
  }
];

export default [
  {
    name: 'Bonjour',
    accordCocordence: true,
    who: 'all',
    description: 'Dire bonjour aux bots',
    keyWord: ['bonjour', 'hello'],
    action: () => ('Bonjour !')
  }, {
    name: 'Clear',
    accordCocordence: false,
    who: 'all',
    description: 'Supprimer les messages',
    keyWord: ['clear'],
    action: () => {
      const messageBox = document.getElementById('message-box');
      messageBox.innerHTML = '';

      return ('Messages supprimer !');
    }
  }, {
    name: 'Insultes',
    accordCocordence: true,
    who: 'all',
    description: 'Dire bonjour aux bots',
    keyWord: ['connard', 'fdp', 'pute', 'salope', 'enculer', 'pouilleux'],
    action: () => ('Les insultes ne pas acceptable !')
  }
];

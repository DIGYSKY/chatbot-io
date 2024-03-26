export default [
  {
    name: 'Bonjour',
    accordCocordence: true,
    history: true,
    who: 'all',
    description: 'Dire bonjour aux bots',
    keyWord: ['bonjour', 'hello', 'salut'],
    action: () => ('<p>Bonjour !</p>')
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

      return ('<p>Messages supprimer !</p>');
    }
  }, {
    name: 'Insultes',
    accordCocordence: true,
    history: true,
    who: 'all',
    description: 'Dire bonjour aux bots',
    keyWord: ['connard', 'fdp', 'pute', 'salope', 'salot', 'enculer',
      'pouilleux', 'con', 'merde', 'bordel', 'enculé', 'conne',
      'emmerdeur', 'branleur', 'salope', 'sale pute', 'taupe', 'taré',
      'tapette', 'gros lard', 'gros bœuf', 'grosse vache', 'grosse truie',
      'gros porc', 'grosse pute', 'grosse salope', 'pédale', 'pédé',
      'enculeur', 'salopard'],
    action: () => ('<p>Les insultes ne pas acceptable !</p>')
  }
];

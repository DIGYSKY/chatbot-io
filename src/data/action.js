import axios from 'axios';

const apiLinks = 'http://localhost:81';

export default [
  {
    name: 'Bonjour',
    accordCocordence: true,
    history: true,
    matchRequired: 1,
    who: 'all',
    description: 'Dire bonjour aux bots',
    keyWord: ['bonjour', 'hello', 'salut'],
    action: async () => ('Bonjour !')
  }, {
    name: 'Clear',
    accordCocordence: false,
    history: false,
    matchRequired: 1,
    who: 'all',
    description: 'Supprimer les messages',
    keyWord: ['clear'],
    action: async () => {
      axios.delete(`${apiLinks}/messages`);
      /* eslint-disable no-restricted-globals */
      location.reload();
      /* eslint-enable no-restricted-globals */
      return ('Messages supprimer !');
    }
  }, {
    name: 'Insultes',
    accordCocordence: false,
    history: true,
    matchRequired: 1,
    who: 'all',
    description: '',
    keyWord: [
      'connard', 'fdp', 'pute', 'salope', 'salot', 'enculer',
      'pouilleux', 'con', 'merde', 'bordel', 'enculé', 'conne',
      'emmerdeur', 'branleur', 'salope', 'sale pute', 'taupe', 'taré',
      'tapette', 'gros lard', 'gros bœuf', 'grosse vache', 'grosse truie',
      'gros porc', 'grosse pute', 'grosse salope', 'pédale', 'pédé',
      'enculeur', 'salopard'
    ],
    action: async () => ('Les insultes ne pas acceptable !')
  }, {
    name: 'ChuckNorris',
    accordCocordence: true,
    history: true,
    matchRequired: 2,
    who: 1,
    description: 'Blague de Chuck Norris',
    keyWord: ['chuck', 'norris'],
    action: async () => {
      const res = await axios.get(`${apiLinks}/chucknorris`);

      const { joke } = res.data;

      return `${joke}`;
    }
  }
];

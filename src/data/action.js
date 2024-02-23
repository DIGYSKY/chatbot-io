export default [
  {
    name: 'Bonjour',
    who: 'all',
    description: 'Dire bonjour aux bots',
    keyWord: ['Bonjour', 'bonjour', 'Hello', 'hello'],
    action: () => ('Bonjour !')
  }, {
    name: 'Insultes',
    who: 'all',
    description: 'Dire bonjour aux bots',
    keyWord: ['Connard', 'CONNARD', 'connard', 'fdp', 'FDP', 'ferailleur'],
    action: () => ('Fils à pute ! Ta mère suce des Ours !!!')
  }
];

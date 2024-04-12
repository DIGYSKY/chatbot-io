import axios from 'axios';

const apiLinks = 'http://localhost:81';

export default [
  {
    name: 'Bonjour',
    accordCocordence: true,
    history: true,
    matchRequired: 1,
    who: [1, 2, 3, 4],
    description: 'Dire bonjour aux bots',
    keyWord: ['bonjour', 'hello', 'salut'],
    action: async () => ('Bonjour !')
  }, {
    name: 'Clear',
    accordCocordence: false,
    history: false,
    matchRequired: 1,
    who: ['all'],
    description: 'Supprimer les messages',
    keyWord: ['clear'],
    action: async () => {
      await axios.delete(`${apiLinks}/messages`);
      /* eslint-disable no-restricted-globals */
      location.reload();
      /* eslint-enable no-restricted-globals */
      return ('Messages supprimés !');
    }
  }, {
    name: 'Insultes',
    accordCocordence: false,
    history: true,
    matchRequired: 1,
    who: ['all'],
    description: '',
    keyWord: [
      'connard', 'fdp', 'pute', 'salope', 'salot', 'enculer',
      'pouilleux', 'con', 'merde', 'bordel', 'enculé', 'conne',
      'emmerdeur', 'branleur', 'salope', 'sale pute', 'taupe', 'taré',
      'tapette', 'gros lard', 'gros bœuf', 'grosse vache', 'grosse truie',
      'gros porc', 'grosse pute', 'grosse salope', 'pédale', 'pédé',
      'enculeur', 'salopard'
    ],
    action: async () => ('Les insultes ne sont pas acceptables !')
  }, {
    name: 'Chuck Norris',
    accordCocordence: true,
    history: true,
    matchRequired: 2,
    who: [1],
    description: 'Anecdote de Chuck Norris',
    keyWord: ['chuck', 'norris'],
    action: async () => {
      const res = await axios.get(`${apiLinks}/chucknorris`);
      const { joke } = res.data;
      return joke;
    }
  }, {
    name: 'Film Disponible {film}',
    accordCocordence: true,
    history: true,
    matchRequired: 2,
    who: [2],
    description: 'Voir la disponiblité d\'un film, et ses détails',
    keyWord: ['film', 'disponible', 'dispo', 'details'],
    action: async (wordList) => {
      const title = wordList.slice(2).join(' ');

      const options = {
        method: 'GET',
        url: 'https://streaming-availability.p.rapidapi.com/search/title',
        params: {
          title,
          country: 'fr',
          show_type: 'all',
          output_language: 'fr'
        },
        headers: {
          'X-RapidAPI-Key': '2ac9c879bbmshdecefd011aef5fcp17f5cejsne6ea4ee2e303',
          'X-RapidAPI-Host': 'streaming-availability.p.rapidapi.com'
        }
      };

      const response = title ? await axios.request(options) : false;

      const result = response ? response.data.result[0] : false;
      const titleRes = result ? result.title : 'Tire inconnu';
      const originTitileRes = result ? result.originalTitle : 'Titre inconnu';
      const tyepRes = result && result.type ? result.type : 'Inconnu';
      const yearRes = result && result.year ? result.year : 'Inconnu';
      const castRes = result && result.cast ? result.cast.join(', ') : 'Inconnu';
      const realRes = result && result.directors ? result.directors.join(', ') : 'Inconnu';
      let dispRes = '';
      let genderRes = '';

      if (result && result.streamingInfo.fr) {
        await result.streamingInfo.fr.forEach(async (plat) => {
          dispRes += plat.streamingType === 'buy' ? `
            Acheter : <a href="${plat.link}">${plat.service}</a> 
            (${plat.price.amount} €)<br>
          ` : '';
          dispRes += plat.streamingType === 'rent' ? `
            Louer : <a href="${plat.link}">${plat.service}</a> 
            (${plat.price.amount} €) <br>
          ` : '';
          dispRes += plat.streamingType === 'subscription' ? `
            Regarder : 
            <a href="${plat.link}">${plat.service}</a><br>
          ` : '';
        });
      } else {
        dispRes = 'Inconnu';
      }

      if (result && result.genres[0]) {
        result.genres.forEach((genre) => {
          genderRes += genre.name ? `${genre.name}, ` : '';
        });
      }

      return (`
        <span style="font-size: 1.5rem; font-weight: bold;">${titleRes}</span><br>
        <span style="font-weight: bold;">Titre originale :</span> ${originTitileRes}<br><br>
        <span style="font-weight: bold;">Année :</span> ${yearRes}<br>
        <span style="font-weight: bold;">Genres :</span> ${genderRes}<br>
        <span style="font-weight: bold;">Type :</span> ${tyepRes}<br>
        <span style="font-weight: bold;">Acteurs :</span> ${castRes}<br>
        <span style="font-weight: bold;">Réalisateurs :</span> ${realRes}<br><br>
        <span style="font-weight: bold;">Disponnibiltés :</span><br>${dispRes}
      `);
    }
  }
];

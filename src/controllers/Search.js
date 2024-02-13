import axios from 'axios';

import viewUsers from '../views/entry';
import viewNav from '../views/nav';
import viewBots from '../views/bots';

const Search = class {
  constructor(params) {
    this.el = document.querySelector('#root');
    this.data = [];
    this.params = params;

    this.run();
  }

  render() {
    return `
      <div class="container-fluid p-0 m-0">
        ${viewNav()}
      </div>
      <div class="row user-list m-0 p-0">
        ${viewBots()} ${viewUsers(this.data)}
      </div>
    `;
  }

  onKeyPress() {
    const elInputSearch = document.querySelector('.input-search');
    const elListUser = document.querySelector('.user-list');

    elInputSearch.addEventListener('keyup', () => {
      const keyWord = elInputSearch.value;
      const data = this.filters(
        this.data,
        ({ user }) => user.name.first.includes(keyWord)
      );

      elListUser.innerHTML = viewUsers(data);
    });
  }

  filters(data, filter, param = true) {
    let updateData = data;

    if (param) {
      updateData = updateData.filter(filter);
    }

    return updateData;
  }

  run() {
    const { results } = this.params;

    axios.get(`https://randomuser.me/api/0.8/?results=${results}`).then((res) => {
      const { data } = res;
      const { age } = this.params;

      this.data = this.filters(
        data.results,
        ({ user }) => (
          new Date(
            new Date().getTime() - new Date(user.dob * 1000).getTime()
          ).getFullYear() - 1970 > age
        ),
        parseInt(age, 10)
      );

      this.el.innerHTML = this.render();
      // this.onKeyPress();
    });
  }
};

export default Search;

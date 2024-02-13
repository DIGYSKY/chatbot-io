import viewUser from './bot';

export default (data) => (data.map((user) => viewUser(user)).join(''));

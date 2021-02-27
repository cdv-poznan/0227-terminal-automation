import {lib} from './lib';

class User {
  constructor(name) {
    this.name = name;
  }
}
async function getUser() {
  const user = await fetch("https://api.github.com/users/juszczak");
  return new User(user.name);
}

lib();

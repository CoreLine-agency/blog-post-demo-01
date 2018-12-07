import { type, query, mutation } from 'decorated-graphql';

export const users = [{
  id: '1',
  email: 'britney@celebrities.com',
  username: 'britney',
  firstName: 'Britney',
  lastName: 'Spears',
  password: 'password123'
}, {
  id: '2',
  email: 'jabba@hutt-industries.agency',
  username: 'the-jabba',
  firstName: 'Jabba',
  lastName: 'The Hutt',
  password: 'security123'
}];

@type`
  id: ID!
  username: String!
  firstName: String!
  lastName: String!
  fullName: String!
  email: String!`
export class User {
  @query`: [User]`
  users() {
    return users;
  }

  @query`(id: ID!): User`
  user({ id }) {
    return users.filter(user => user.id === id)[0];
  }

  @mutation`(username: String!, firstName: String!, lastName: String!, password: String!): User!`
  createUser(inputArgs) {
    const id = (users.length + 1).toString();
    const newUser = { id, ...inputArgs };
    users.push(newUser);

    return newUser;
  }

  fullName(user) {
    return `${user.firstName} ${user.lastName}`;
  }
}

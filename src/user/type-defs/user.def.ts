export default `#graphql
  extend type Query {
    authenticateUser(email: String!, password: String!): AuthResponse!
    authUserProfile: User! @isAuth
    getUsers: [User!]! @isAuth
  }

  extend type Mutation {
    registerUser(user: UserCreationInput!): AuthResponse!
    editUserById(id: ID!, user: UserUpdationInput!): User! @isAuth
    deleteUserById(id: ID!): PushNotification! @isAuth
  }

  input UserCreationInput {
    name: String!
    email: String!
    password: String!
  }

  input UserUpdationInput {
    name: String
    password: String
  }

  type User {
    id: ID!
    name: String!
    email: String!
    createdAt: String
    updatedAt: String
    deletedAt: String
  }

  type AuthResponse {
    user: User!
    token: String!
  }
`;

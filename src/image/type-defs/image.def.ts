export default `#graphql
  extend type Query {
    info: String!
  }

  extend type Mutation {
    imageUploader(file: Upload!): String!
  }
`;

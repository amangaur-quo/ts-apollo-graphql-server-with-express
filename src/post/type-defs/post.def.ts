export default `#graphql
  extend type Query {
    getPosts: [Post!]! @isAuth
    getPostById(id: ID!): Post! @isAuth
    getPostsByLimitAndPage(page: Int, limit: Int): PostPaginator! @isAuth
  }

  extend type Mutation {
    createPost(post: PostCreationInput!): Post! @isAuth
    editPostById(id: ID!, post: PostUpdationInput!): Post! @isAuth
    deletePostById(id: ID!): PushNotification! @isAuth
  }

  input PostCreationInput {
    title: String!
    content: String!
    featuredImgae: String
  }

  input PostUpdationInput {
    title: String
    content: String
    featuredImgae: String
  }

  type Post {
    id: ID!
    title: String!
    content: String!
    featuredImgae: String
    createdAt: String
    updatedAt: String
    deletedAt: String
    author: User!
  }

  type PostPaginator {
    posts: [Post!]!
    paginator: PostLabels
  }

  type PostLabels {
    postCount: Int!
    perPage: Int!
    pageCount: Int!
    currentPage: Int!
    slNo: Int!
    hasPrevPage: Boolean!
    hasNextPage: Boolean!
    prev: Int
    next: Int
  }
`;

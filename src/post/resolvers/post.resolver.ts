const myCustomLabels = {
  totalDocs: 'postCount',
  docs: 'posts',
  limit: 'perPage',
  page: 'currentPage',
  nextPage: 'next',
  prevPage: 'prev',
  totalPages: 'pageCount',
  pagingCounter: 'slNo',
  meta: 'paginator',
};

export default {
  Query: {
    getPosts: async (_, {}, { Post }) => {
      return Post.find().populate('author');
    },

    getPostById: async (_, { id }, { Post }) => {
      return Post.findById(id).populate('author');
    },

    getPostsByLimitAndPage: async(_, { page, limit }, { Post, authUser }) => {
      const options = {
        page: page || 1,
        limit: limit || 10,
        sort: { createdAt: -1 },
        populate: 'author',
        customLabels: myCustomLabels,
      };

      return Post.paginate({ deletedAt: null, author: authUser._id }, options);
    }
  },

  Mutation: {
    createPost: async (_, { post }, { Post, authUser }) => {
      const newPost = await Post.create({ ...post, author: authUser._id });
      return newPost.populate('author');
    },

    editPostById: async (_, { id, post }, { Post, authUser }) => {
      try {
        const updatedPost = await Post.findOneAndUpdate(
          { _id: id, author: authUser._id }, 
          { ...post }, 
          { new: true }
        ).populate('author');
        
        if (!updatedPost) {
          throw new Error('Failed to update the post. Please try again later.');
        }
        return updatedPost;
      }
      catch (error) {
        throw new Error(error.message);
      }
    },

    deletePostById: async (_, { id }, { Post, authUser }) => {
      try {
        const deletedPost = await Post.findOneAndUpdate(
          { _id: id, author: authUser._id }, 
          { deletedAt: new Date() }, 
          { new: true }
        );

        if (!deletedPost) {
          throw new Error('Failed to delete the post. Please try again later.');
        }
        return { id, message: 'Deleted successfully', success: true };
      }
      catch (error) {
        throw new Error(error.message);
      }
    },
  },
};

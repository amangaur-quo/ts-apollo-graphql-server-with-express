import { compare, hash } from 'bcrypt';
import { serializeUser, validateEmail } from '../utils';
import { issueToken } from '../../core/utils';
import { GraphQLError } from 'graphql';

export default {
  Query: {
    authenticateUser: async (_, { email, password }, { User }) => {
      try {
        let user = await User.findOne({ email });
        if (!user) {
          throw new Error('Email does not exist');
        }

        let isMatch = await compare(password, user.password);
        if (!isMatch) {
          throw new Error('Invalid email or password. Please try again!');
        }
        user = user.toObject();
        user.id = user._id;
        user = serializeUser(user);
        let token = await issueToken(user);
        return { user, token };
      } catch (error) {
        throw new Error(error.message);
      }
    },

    authUserProfile: async (_, {}, { authUser }) => authUser,

    getUsers: async (_, {}, { User }) => {
      return User.find();
    },
  },

  Mutation: {
    registerUser: async (_, { user }, { User }) => {
      try {
        const { email } = user;
        let userInfo;
        userInfo = await User.findOne({ email });
        if (userInfo) {
          // throw new Error(
          //   'Email already exist. Please try using another email address.'
          // );
          throw new GraphQLError('Email already exist. Please try using another email address.', {
            extensions: { code: 400 },
          });
        }
        if (validateEmail(email)) {
          userInfo = new User(user);
          userInfo.password = await hash(user.password, 10);
          let newUser = await User.create(userInfo);
          newUser = newUser.toObject();
          newUser.id = newUser._id;
          newUser = serializeUser(newUser);
          let token = await issueToken(newUser);
          return { user: newUser, token };
        } else {
          throw new Error('Please enter a valid email');
        }
      } catch (error) {
        // throw new Error(error.message);
        throw new GraphQLError('Email already exist. Please try using another email address.', {
          extensions: { code: 400 },
        });
      }
    },

    editUserById: async (_, { id, user }, { User }) => {
      return User.findByIdAndUpdate(id, { ...user }, { new: true });
    },

    deleteUserById: async (_, { id }, { User }) => {
      await User.findByIdAndUpdate(
        id,
        { deletedAt: new Date() },
        { new: true }
      );
      return { id, message: 'Deleted successfully', success: true };
    },
  },
};

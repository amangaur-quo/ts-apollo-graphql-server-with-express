import { ApolloServer } from '@apollo/server';
import { expressMiddleware } from '@apollo/server/express4';
import express from 'express';
import cors from 'cors';
import { json } from 'body-parser';
import mongoose from 'mongoose';
import { PORT, DB_URI } from './config';
import { join } from 'path';
import { makeExecutableSchema } from '@graphql-tools/schema';
import { authDirectiveTransformer } from './core/directives';
import { resolvers, typeDefs } from './core/graphql';
import { IRequestWithAuthInfo } from './core/interfaces';
import { authMiddleware } from './core/middlewares';
import * as AppModels from './core/models';

// Initialize the Express Application
const app = express();
app.use(authMiddleware);
app.use(express.static(join(__dirname, './uploads')));

const startApp = async () => {
  try {
    mongoose.set('strictQuery', false)
    await mongoose.connect(DB_URI);
    console.log('Mongoose Client has been connected successfully.');

    let schema = makeExecutableSchema({
      typeDefs,
      resolvers,
    });
    schema = authDirectiveTransformer(schema, 'isAuth');

    const apolloServer = new ApolloServer({ schema });
    await apolloServer.start();

    app.use(
      cors<cors.CorsRequest>(),
      json(),
      expressMiddleware(apolloServer, {
        context: async ({ req }) => {
          let { isAuth, authUser } = req as IRequestWithAuthInfo;

          return {
            req,
            isAuth,
            authUser,
            ...AppModels,
          };
        },
      })
    );

    app.listen(PORT, () => {
      console.log(`Server started on PORT ${PORT}`);
    });
  } catch (error) {
    console.log({ message: error.message });
  }
};

startApp();

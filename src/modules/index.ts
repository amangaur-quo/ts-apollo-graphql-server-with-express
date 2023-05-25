// Import Models
import { Post } from './post/models';
import { User } from './user/models';
export const appModels = { Post, User };

// Import Resolvers
import { imageResolver } from './image/resolvers';
import { postResolver } from './post/resolvers';
import { userResolver } from './user/resolvers';
export const resolvers = [imageResolver, postResolver, userResolver];

// Import TypeDefs
import { baseDef } from '../core/type-defs';
import { imageDef } from './image/type-defs';
import { postDef } from './post/type-defs';
import { userDef } from './user/type-defs';
export const typeDefs = [baseDef, imageDef, postDef, userDef];

import { GraphQLSchema, defaultFieldResolver } from 'graphql';
import { mapSchema, getDirective, MapperKind } from '@graphql-tools/utils';

export const authDirectiveTransformer = (schema: GraphQLSchema, directiveName: string) => {
	return mapSchema(schema, {
		// Executes once for each object field in the schema
		[MapperKind.OBJECT_FIELD]: fieldConfig => {
			// Check whether this field has the specified directive
			const authDirective = getDirective(schema, fieldConfig, directiveName)?.[0];

			if (authDirective) {
				// Get this field's original resolver
				const { resolve = defaultFieldResolver } = fieldConfig;

				// Replace the original resolver with a function that *first* calls
				// the original resolver, then converts its result to verify authentication
				fieldConfig.resolve = async (...args) => {
					let [_, {}, { isAuth }] = args;
					if (isAuth) {
						return resolve.apply(this, args);
					} else {
						throw new Error('You must be authenticated user to get this information.');
					}
				};
				return fieldConfig;
			}
		},
	});
};

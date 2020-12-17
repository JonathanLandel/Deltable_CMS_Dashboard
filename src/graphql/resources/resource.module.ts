import { GraphQLModule } from "@graphql-modules/core";
import { buildSchemaSync } from "type-graphql";

import ResourceResolver from "./resource.resolver";
import { ResourceContainer } from "./resource";

const resolvers = [ResourceResolver] as const;

// @ts-ignore
const ResourceModule = new GraphQLModule({
  providers: [ResourceContainer, ...resolvers],
  extraSchemas: [
    buildSchemaSync({
      resolvers,
      orphanedTypes: [],
      container: ({ context }) =>
        ResourceModule.injector.getSessionInjector(context),
      skipCheck: false,
    }),
  ],
});

export default ResourceModule;

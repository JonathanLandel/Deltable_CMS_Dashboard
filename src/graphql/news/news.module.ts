import { GraphQLModule } from "@graphql-modules/core";
import { buildSchemaSync } from "type-graphql";

import NewsResolver from "./news.resolver";
import { NewContainer } from "./news";

const resolvers = [NewsResolver] as const;

// @ts-ignore
const NewsModule = new GraphQLModule({
  providers: [NewContainer, ...resolvers],
  extraSchemas: [
    buildSchemaSync({
      resolvers,
      orphanedTypes: [],
      container: ({ context }) =>
        NewsModule.injector.getSessionInjector(context),
      skipCheck: false,
    }),
  ],
});

export default NewsModule;

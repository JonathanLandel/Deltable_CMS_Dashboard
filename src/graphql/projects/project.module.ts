import { GraphQLModule } from "@graphql-modules/core";
import { buildSchemaSync } from "type-graphql";

import ProjectResolver from "./project.resolver";
import { ProjectContainer } from "./projects";

const resolvers = [ProjectResolver] as const;

// @ts-ignore
const ProjectModule = new GraphQLModule({
  providers: [ProjectContainer, ...resolvers],
  extraSchemas: [
    buildSchemaSync({
      resolvers,
      orphanedTypes: [],
      container: ({ context }) =>
        ProjectModule.injector.getSessionInjector(context),
      skipCheck: false,
    }),
  ],
});

export default ProjectModule;

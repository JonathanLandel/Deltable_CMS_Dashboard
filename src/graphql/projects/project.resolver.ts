import { Injectable } from "@graphql-modules/di";
import {
  Resolver,
  Query,
  Arg,
  Mutation,
  Args,
  FieldResolver,
  Root,
} from "type-graphql";

import { Project, ProjectRecord, ProjectRef, Pagination } from "./project.type";
import { ProjectContainer } from "./projects";

@Injectable()
@Resolver((of) => Project)
export default class ProjectResolver {
  constructor(private readonly projectsService: ProjectContainer) {}

  @Query((returns) => [ProjectRef])
  async Projects(
    @Arg("Page", {
      nullable: true,
      defaultValue: {
        count: 10,
        after: null,
        before: null,
      },
    })
    Page: Pagination
  ) {
    return (await this.projectsService.listProjects(Page)) as ProjectRef[];
  }

  @Query((returns) => ProjectRef)
  async Project(
    @Arg("ID", {
      nullable: false,
    })
    ID: string
  ) {
    const projects = await this.projectsService.getProject(ID);
    return {
      ...projects,
      ref: projects.ref.toString(),
    } as ProjectRef;
  }

  @Query((returns) => [ProjectRef])
  async ProjectByName(
    @Arg("Name", {
      nullable: false,
    })
    Name: string,
    @Arg("Page", {
      nullable: true,
      defaultValue: {
        count: 10,
        after: null,
        before: null,
      },
    })
    Page: Pagination
  ) {
    const projects = await this.projectsService.getByProjectName(Name, Page);
    console.log(projects);
    return projects as ProjectRef[];
  }

  @Query((returns) => [ProjectRef])
  async ProjectByLanguage(
    @Arg("Language", {
      nullable: false,
    })
    Language: string,
    @Arg("Page", {
      nullable: true,
      defaultValue: {
        count: 10,
        after: null,
        before: null,
      },
    })
    Page: Pagination
  ) {
    const projects = await this.projectsService.getByProjectLanguage(
      Language,
      Page
    );
    return projects as ProjectRef[];
  }

  @Query((returns) => [String])
  async AllProjectLanguages() {
    return await this.projectsService.listProjectLanguages();
  }

  @Mutation((returns) => ProjectRef)
  async CreateProject(
    @Arg("Record", {
      nullable: false,
    })
    Record: ProjectRecord
  ) {
    const projects = await this.projectsService.createProject(Record);
    return projects as ProjectRef;
  }

  @Mutation((returns) => ProjectRef)
  async ReplaceProject(
    @Arg("ID", {
      nullable: false,
    })
    ID: string,
    @Arg("Record", {
      nullable: false,
    })
    Record: ProjectRecord
  ) {
    const projects = await this.projectsService.replaceProject(ID, Record);
    return projects as ProjectRecord;
  }

  @Mutation((returns) => ProjectRef)
  async DeleteProject(
    @Arg("ID", {
      nullable: false,
    })
    ID: string
  ) {
    const projects = await this.projectsService.deleteProject(ID);
    return projects as ProjectRef;
  }
}

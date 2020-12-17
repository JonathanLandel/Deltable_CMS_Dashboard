import {
  Field,
  FieldResolver,
  ObjectType,
  Int,
  Root,
  InputType,
} from "type-graphql";
import type { Project as ProjectI } from "./projects";

@ObjectType()
export class Project implements ProjectI {
  @Field((type) => String, {
    nullable: false,
  })
  public name!: string;

  @Field((type) => [String], {
    nullable: false,
  })
  languages!: string[];

  @Field((type) => String, {
    nullable: false,
  })
  status!: string;

  @Field((type) => String, {
    nullable: false,
  })
  public description!: string;
}

@InputType()
export class ProjectRecord {
  @Field((type) => String, {
    nullable: false,
  })
  public name!: string;

  @Field((type) => [String], {
    nullable: false,
  })
  languages!: string[];

  @Field((type) => String, {
    nullable: false,
  })
  status!: string;

  @Field((type) => String, {
    nullable: false,
  })
  public description!: string;
}

@ObjectType()
export class ProjectRef {
  @Field((type) => String, {
    nullable: false,
  })
  ref!: string;

  @Field((type) => Number, {
    nullable: false,
  })
  ts!: number;

  @Field((type) => Project, {
    nullable: false,
  })
  data!: Project;
}

@InputType()
export class Pagination {
  @Field((type) => Number, {
    nullable: false,
  })
  public count!: string;

  @Field((type) => String, {
    nullable: true,
    defaultValue: null,
  })
  before!: string | null;

  @Field((type) => String, {
    nullable: true,
    defaultValue: null,
  })
  after!: string | null;
}

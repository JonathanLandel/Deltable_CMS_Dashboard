import {
  Field,
  FieldResolver,
  ObjectType,
  Int,
  Root,
  InputType,
} from "type-graphql";
import type { Resource as ResourceI } from "./resource";

@ObjectType()
export class Resource implements ResourceI {
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
  link!: string;

  @Field((type) => String, {
    nullable: false,
  })
  description!: string;

  @Field((type) => [String], {
    nullable: false,
  })
  tags!: string[];
}

@InputType()
export class ResourceRecord {
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
  link!: string;

  @Field((type) => String, {
    nullable: false,
  })
  description!: string;

  @Field((type) => [String], {
    nullable: false,
  })
  tags!: string[];
}

@ObjectType()
export class ResourceRef {
  @Field((type) => String, {
    nullable: false,
  })
  ref!: string;

  @Field((type) => Number, {
    nullable: false,
  })
  ts!: number;

  @Field((type) => Resource, {
    nullable: false,
  })
  data!: Resource;
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

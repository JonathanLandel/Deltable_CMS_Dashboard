import {
  Field,
  FieldResolver,
  ObjectType,
  Int,
  Root,
  InputType,
} from "type-graphql";
import type { New as NewsI } from "./news";

@ObjectType()
export class News implements NewsI {
  @Field((type) => String, {
    nullable: false,
  })
  public name!: string;

  @Field((type) => String, {
    nullable: false,
  })
  public description!: string;

  @Field((type) => String, {
    nullable: false,
  })
  link!: string;

  @Field((type) => [String], {
    nullable: false,
  })
  tags!: string[];
}

@InputType()
export class NewsRecord {
  @Field((type) => String, {
    nullable: false,
  })
  public name!: string;

  @Field((type) => String, {
    nullable: false,
  })
  public description!: string;

  @Field((type) => String, {
    nullable: false,
  })
  link!: string;

  @Field((type) => [String], {
    nullable: false,
  })
  tags!: string[];
}

@ObjectType()
export class NewsRef {
  @Field((type) => String, {
    nullable: false,
  })
  ref!: string;

  @Field((type) => Number, {
    nullable: false,
  })
  ts!: number;

  @Field((type) => News, {
    nullable: false,
  })
  data!: News;
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

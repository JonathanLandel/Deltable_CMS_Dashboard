import {
  Field,
  FieldResolver,
  ObjectType,
  Int,
  Root,
  InputType,
} from "type-graphql";
import type { Blog as BlogI } from "./blogs";

@ObjectType({
  description: "Blog Record",
})
export class Blog implements BlogI {
  @Field((type) => String, {
    description: "Blog hero image, or null for none",
    nullable: true,
    defaultValue: null,
  })
  header!: string | null;

  @Field((type) => String, {
    description: "Blog Name",
    nullable: false,
  })
  name!: string;

  @Field((type) => String, {
    description: "Short Description",
    nullable: false,
  })
  description!: string;

  @Field((type) => [String], {
    description: "Blog tags",
    nullable: false,
  })
  tags!: string[];

  @Field((type) => [String], {
    description: "Languages discussed in post",
    nullable: false,
  })
  languages!: string[];

  @Field((type) => [String], {
    description: "Titles of sections for a shortcut",
    nullable: false,
  })
  sections!: string[];

  @Field((type) => String, {
    description: "MD of the blog post",
    nullable: false,
  })
  content!: string;
}

@InputType({
  description: "Blog Record",
})
export class BlogRecord {
  @Field((type) => String, {
    description: "Blog hero image, or null for none",
    nullable: true,
    defaultValue: null,
  })
  header!: string | null;

  @Field((type) => String, {
    description: "Blog Name",
    nullable: false,
  })
  name!: string;

  @Field((type) => String, {
    description: "Short Description",
    nullable: false,
  })
  description!: string;

  @Field((type) => [String], {
    description: "Blog tags",
    nullable: true,
    defaultValue: [],
  })
  tags!: string[];

  @Field((type) => [String], {
    description: "Languages discussed in post",
    nullable: true,
    defaultValue: [],
  })
  languages!: string[];

  @Field((type) => [String], {
    description: "Titles of sections for a shortcut",
    nullable: true,
    defaultValue: [],
  })
  sections!: string[];

  @Field((type) => String, {
    description: "MD of the blog post",
    nullable: false,
  })
  content!: string;
}

@ObjectType()
export class BlogRef {
  @Field((type) => String, {
    description: "Collection and ID complex key",
    nullable: false,
  })
  ref!: string;

  @Field((type) => Number, {
    description: "Edit timestamp",
    nullable: false,
  })
  ts!: number;

  @Field((type) => Blog, {
    description: "Record Data",
    nullable: false,
  })
  data!: Blog;
}

@InputType()
export class Pagination {
  @Field((type) => Number, {
    description: "Number of records to retreive",
    nullable: false,
  })
  count!: string;

  @Field((type) => String, {
    description: "ID of record to get [count] records before",
    nullable: true,
    defaultValue: null,
  })
  before!: string | null;

  @Field((type) => String, {
    description: "ID of record to get [count] records after",
    nullable: true,
    defaultValue: null,
  })
  after!: string | null;
}

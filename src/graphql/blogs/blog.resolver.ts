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

import { Blog, BlogRecord, BlogRef, Pagination } from "./blog.type";
import { BlogContainer } from "./blogs";

@Injectable()
@Resolver((of) => Blog)
export default class BlogResolver {
  constructor(private readonly blogsService: BlogContainer) {}

  @Query((returns) => [BlogRef])
  async Blogs(
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
    return (await this.blogsService.listBlogs(Page)) as BlogRef[];
  }

  @Query((returns) => BlogRef)
  async Blog(
    @Arg("ID", {
      nullable: false,
    })
    ID: string
  ) {
    const blogss = await this.blogsService.getBlog(ID);
    return {
      ...blogss,
      ref: blogss.ref.toString(),
    } as BlogRef;
  }

  @Query((returns) => [BlogRef])
  async BlogByName(
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
    const blogss = await this.blogsService.getByBlogName(Name, Page);
    console.log(blogss);
    return blogss as BlogRef[];
  }

  @Query((returns) => [BlogRef])
  async BlogByTag(
    @Arg("Tag", {
      nullable: false,
    })
    Tag: string,
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
    const blogss = await this.blogsService.getByBlogTag(Tag, Page);
    return blogss as BlogRef[];
  }

  @Query((returns) => [String])
  async AllBlogTags() {
    return await this.blogsService.listBlogTags();
  }

  @Query((returns) => [String])
  async AllBlogLanguages() {
    return await this.blogsService.listBlogLanguages();
  }

  @Mutation((returns) => BlogRef)
  async CreateBlog(
    @Arg("Record", {
      nullable: false,
    })
    Record: BlogRecord
  ) {
    const blogs = await this.blogsService.createBlog(Record);
    return blogs as BlogRef;
  }

  @Mutation((returns) => BlogRef)
  async ReplaceBlog(
    @Arg("ID", {
      nullable: false,
    })
    ID: string,
    @Arg("Record", {
      nullable: false,
    })
    Record: BlogRecord
  ) {
    const newss = await this.blogsService.replaceBlog(ID, Record);
    return newss as BlogRef;
  }

  @Mutation((returns) => BlogRef)
  async DeleteBlog(
    @Arg("ID", {
      nullable: false,
    })
    ID: string
  ) {
    const blogs = await this.blogsService.deleteBlog(ID);
    return blogs as BlogRef;
  }
}

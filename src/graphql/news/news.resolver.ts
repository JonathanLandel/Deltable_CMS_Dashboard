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

import { News, NewsRecord, NewsRef, Pagination } from "./news.type";
import { NewContainer } from "./news";

@Injectable()
@Resolver((of) => News)
export default class NewsResolver {
  constructor(private readonly newssService: NewContainer) {}

  @Query((returns) => [NewsRef])
  async News(
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
    return (await this.newssService.listNewss(Page)) as NewsRef[];
  }

  @Query((returns) => NewsRef)
  async NewsStory(
    @Arg("ID", {
      nullable: false,
    })
    ID: string
  ) {
    const newsss = await this.newssService.getNews(ID);
    return {
      ...newsss,
      ref: newsss.ref.toString(),
    } as NewsRef;
  }

  @Query((returns) => [NewsRef])
  async NewsByName(
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
    const newsss = await this.newssService.getByNewsName(Name, Page);
    console.log(newsss);
    return newsss as NewsRef[];
  }

  @Query((returns) => [NewsRef])
  async NewsByTag(
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
    const newsss = await this.newssService.getByNewsTag(Tag, Page);
    return newsss as NewsRef[];
  }

  @Query((returns) => [String])
  async AllNewsTags() {
    return await this.newssService.listNewsTags();
  }

  @Mutation((returns) => NewsRef)
  async CreateNews(
    @Arg("Record", {
      nullable: false,
    })
    Record: NewsRecord
  ) {
    const newss = await this.newssService.createNews(Record);
    return newss as NewsRef;
  }

  @Mutation((returns) => NewsRef)
  async ReplaceNews(
    @Arg("ID", {
      nullable: false,
    })
    ID: string,
    @Arg("Record", {
      nullable: false,
    })
    Record: NewsRecord
  ) {
    const newss = await this.newssService.replaceNews(ID, Record);
    return newss as NewsRecord;
  }

  @Mutation((returns) => NewsRef)
  async DeleteNews(
    @Arg("ID", {
      nullable: false,
    })
    ID: string
  ) {
    const newss = await this.newssService.deleteNews(ID);
    return newss as NewsRef;
  }
}

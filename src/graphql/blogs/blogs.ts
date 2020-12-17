import { Driver, Helper } from "../services/faunadb";
import type faunadb from "faunadb";
import type { Pagination } from "./blog.type";
import type { BlogRecord } from "./blog.type";
type Client = faunadb.Client;

export interface Blog {
  header: string | null;
  name: string;
  description: string;
  tags: string[];
  languages: string[];
  sections: string[];
  content: string;
}

export class BlogContainer {
  public q: typeof faunadb.query;
  public client: Client;
  public helper: Helper;
  public secret: string;
  public dev: boolean;

  constructor(
    { secret, dev }: { secret?: string; dev?: boolean } = { dev: true }
  ) {
    if (!secret) this.secret = "fnAD7kp-3IACAtgFGQyYhIT6lWKbw6ejlg0-fSCw";
    else this.secret = secret;
    if (!dev) this.dev = false;
    else this.dev = dev;

    const { q, client } = new Driver(this.secret);
    const h = new Helper({ q, client });
    this.q = q;
    this.client = client;
    this.helper = h;
  }

  async getBlog(id: string) {
    const record = await this.helper.GetRecordInCollection<{
      ref: any;
      data: Blog;
      ts: number;
    }>("blogs", id);
    console.log(record);
    return record;
  }

  async createBlog(resource: BlogRecord, preserveRef: boolean = false) {
    const newRecord = await this.helper.CreateRecord<{
      ref: any;
      data: Blog;
      ts: number;
    }>("blogs", resource);
    if (this.dev) {
      console.log("=== New Record ===");
      console.log(newRecord);
    }
    if (preserveRef) {
      return newRecord;
    } else {
      return {
        ...newRecord,
        ref: newRecord.ref.toString(),
      } as { ref: any; data: Blog; ts: number };
    }
  }

  async updateBlog(id: string, update: Partial<Blog>) {
    const recordUpdate = await this.helper.UpdateRecord<Partial<Blog>>(
      "blogs",
      id,
      update
    );
    if (this.dev) {
      console.log("=== Record Updated ===");
      console.log(recordUpdate);
    }
    return recordUpdate;
  }

  async replaceBlog(id: string, replacement: Blog) {
    const recordReplace = (await this.helper.ReplaceRecord<Blog>(
      "blogs",
      id,
      replacement
    )) as any;
    if (this.dev) {
      console.log("=== Record Replaced ===");
      console.log(recordReplace);
    }
    return {
      ...recordReplace,
      ref: recordReplace.ref.toString(),
    };
  }

  async deleteBlog(id: string) {
    const response = (await this.helper.DeleteRecord("blogs", id)) as any;
    if (this.dev) {
      console.log("=== Record Deleted ===");
      console.log(response);
    }
    return {
      ...response,
      ref: response.ref.toString(),
    };
  }

  async listBlogs(page: Pagination) {
    const response = await this.helper.ListRecordInIndex("all_blogs", "blogs", {
      pageSize:
        page.after === null
          ? Number.parseInt(page.count) + 1
          : Number.parseInt(page.count),
      ...(page.after
        ? {
            after: page.after,
          }
        : {}),
      ...(page.before
        ? {
            before: page.before,
          }
        : {}),
    });
    if (this.dev) {
      console.log("=== List Records ===");
      console.log(response);
    }
    const toReturn = ((response as any[]) || []).map((rec: any) => {
      return {
        ...rec,
        ref: rec.ref.toString(),
      };
    });
    if (page.after) {
      toReturn.shift();
    }
    return toReturn;
  }

  async getByBlogName(name: string, page: Pagination) {
    const response = await this.helper.SearchRecordInIndex(
      "blogs_by_name",
      "blogs",
      [name],
      {
        pageSize:
          page && page.after === null
            ? Number.parseInt(page.count) + 1
            : Number.parseInt(page.count),
        ...(page.after
          ? {
              after: page.after,
            }
          : {}),
        ...(page.before
          ? {
              before: page.before,
            }
          : {}),
      }
    );
    const toReturn = ((response as any[]) || []).map((rec: any) => {
      return {
        ...rec,
        ref: rec.ref.toString(),
      };
    });
    if (page && page.after) {
      toReturn.shift();
    }
    return toReturn;
  }

  async getByBlogTag(tag: string, page: Pagination) {
    const response = await this.helper.SearchRecordInIndex(
      "blogs_by_tags",
      "blogs",
      [tag],
      {
        pageSize:
          page.after === null
            ? Number.parseInt(page.count) + 1
            : Number.parseInt(page.count),
        ...(page.after
          ? {
              after: page.after,
            }
          : {}),
        ...(page.before
          ? {
              before: page.before,
            }
          : {}),
      }
    );
    const toReturn = ((response as any[]) || []).map((rec: any) => {
      return {
        ...rec,
        ref: rec.ref.toString(),
      };
    });
    if (page && page.after) {
      toReturn.shift();
    }
    return toReturn;
  }

  async listBlogTags() {
    return this.helper.GetUniqueValues<string[]>({
      index: "all_blogs",
      path: "tags",
    });
  }

  async listBlogLanguages() {
    return this.helper.GetUniqueValues<string[]>({
      index: "all_blogs",
      path: "languages",
    });
  }
}

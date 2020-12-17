import { Driver, Helper } from "../services/faunadb";
import type faunadb from "faunadb";
import type { Pagination } from "./news.type";
type Client = faunadb.Client;

export interface New {
  name: string;
  description: string;
  link: string;
  tags: string[];
}

export class NewContainer {
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

  async getNews(id: string) {
    const record = await this.helper.GetRecordInCollection<{
      ref: any;
      data: New;
      ts: number;
    }>("news", id);
    console.log(record);
    return record;
  }

  async createNews(resource: New, preserveRef: boolean = false) {
    const newRecord = await this.helper.CreateRecord<{
      ref: any;
      data: New;
      ts: number;
    }>("news", resource);
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
      } as { ref: any; data: New; ts: number };
    }
  }

  async updateNews(id: string, update: Partial<New>) {
    const recordUpdate = await this.helper.UpdateRecord<Partial<New>>(
      "news",
      id,
      update
    );
    if (this.dev) {
      console.log("=== Record Updated ===");
      console.log(recordUpdate);
    }
    return recordUpdate;
  }

  async replaceNews(id: string, replacement: New) {
    const recordReplace = (await this.helper.ReplaceRecord<New>(
      "news",
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

  async deleteNews(id: string) {
    const response = (await this.helper.DeleteRecord("news", id)) as any;
    if (this.dev) {
      console.log("=== Record Deleted ===");
      console.log(response);
    }
    return {
      ...response,
      ref: response.ref.toString(),
    };
  }

  async listNewss(page: Pagination) {
    const response = await this.helper.ListRecordInIndex("all_news", "news", {
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

  async getByNewsName(name: string, page: Pagination) {
    const response = await this.helper.SearchRecordInIndex(
      "news_by_name",
      "news",
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

  async getByNewsTag(tag: string, page: Pagination) {
    const response = await this.helper.SearchRecordInIndex(
      "news_by_tag",
      "news",
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

  async listNewsTags() {
    return this.helper.GetUniqueValues<string[]>({
      index: "all_news",
      path: "tags",
    });
  }
}

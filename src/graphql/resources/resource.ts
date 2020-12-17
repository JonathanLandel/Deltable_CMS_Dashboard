import { Driver, Helper } from "../services/faunadb";
import type faunadb from "faunadb";
import type { Pagination } from "./resource.type";
type Client = faunadb.Client;

export interface Resource {
  name: string;
  description: string;
  link: string;
  tags: string[];
  status: string;
}

export function createPageOptions(page: Pagination) {
  return {
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
  };
}

function dereference(response: any) {
  return {
    ...response,
    ref: response.ref.toString(),
  };
}

function dereferenceList(responses: any[], page: Pagination) {
  const toReturn = ((responses as any[]) || []).map((rec: any) =>
    dereference(rec)
  );
  if (page && page.after) {
    toReturn.shift();
  }
  return toReturn;
}

export class ResourceContainer {
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

  async getResource(id: string, preserveRef: boolean = false) {
    const record = await this.helper.GetRecordInCollection<{
      ref: any;
      data: Resource;
      ts: number;
    }>("resources", id);
    if (this.dev) {
      console.log("=== Found Record ===");
      console.log(record);
    }
    if (preserveRef) {
      return record;
    } else {
      return dereference(record);
    }
  }

  async createResource(resource: Resource, preserveRef: boolean = false) {
    const newRecord = await this.helper.CreateRecord<{
      ref: any;
      data: Resource;
      ts: number;
    }>("resources", resource);
    if (this.dev) {
      console.log("=== New Record ===");
      console.log(newRecord);
    }
    if (preserveRef) {
      return newRecord;
    } else {
      return dereference(newRecord);
    }
  }

  async updateResource(
    id: string,
    update: Partial<Resource>,
    preserveRef: boolean = false
  ) {
    const recordUpdate = await this.helper.UpdateRecord<Partial<Resource>>(
      "resources",
      id,
      update
    );
    if (this.dev) {
      console.log("=== Record Updated ===");
      console.log(recordUpdate);
    }
    if (preserveRef) {
      return recordUpdate;
    } else {
      return dereference(recordUpdate);
    }
  }

  async replaceResource(
    id: string,
    replacement: Resource,
    preserveRef: boolean = false
  ) {
    const recordReplace = (await this.helper.ReplaceRecord<Resource>(
      "resources",
      id,
      replacement
    )) as any;
    if (this.dev) {
      console.log("=== Record Replaced ===");
      console.log(recordReplace);
    }
    if (preserveRef) {
      return recordReplace;
    } else {
      return dereference(recordReplace);
    }
  }

  async deleteResource(id: string, preserveRef: boolean = false) {
    const response = (await this.helper.DeleteRecord("resources", id)) as any;
    if (this.dev) {
      console.log("=== Record Deleted ===");
      console.log(response);
    }
    if (preserveRef) {
      return response;
    } else {
      return dereference(response);
    }
  }

  async listResources(page: Pagination, preserveRef: boolean = false) {
    const response = await this.helper.ListRecordInIndex(
      "all_resources",
      "resources",
      createPageOptions(page)
    );
    if (this.dev) {
      console.log("=== List Records ===");
      console.log(response);
    }
    if (preserveRef) {
      return response;
    } else {
      return dereferenceList(response as any[], page);
    }
  }

  async getByResourceName(
    name: string,
    page: Pagination,
    preserveRef: boolean = false
  ) {
    const response = await this.helper.SearchRecordInIndex(
      "resources_by_name",
      "resources",
      [name],
      createPageOptions(page)
    );
    if (preserveRef) {
      return response;
    } else {
      return dereferenceList(response as any[], page);
    }
  }

  async getByResourceTag(
    tag: string,
    page: Pagination,
    preserveRef: boolean = false
  ) {
    const response = await this.helper.SearchRecordInIndex(
      "resources_by_tags",
      "resources",
      [tag],
      createPageOptions(page)
    );
    if (preserveRef) {
      return response;
    } else {
      return dereferenceList(response as any[], page);
    }
  }

  async listResourcesTags() {
    return this.helper.GetUniqueValues<string[]>({
      index: "all_resources",
      path: "tags",
    });
  }
}

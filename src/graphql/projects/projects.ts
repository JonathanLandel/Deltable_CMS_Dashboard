import { Driver, Helper } from "../services/faunadb";
import type faunadb from "faunadb";
import type { Pagination } from "./project.type";
type Client = faunadb.Client;

export interface Project {
  name: string;
  languages: string[];
  description: string;
  status: string;
}

export class ProjectContainer {
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

  async getProject(id: string) {
    const record = await this.helper.GetRecordInCollection<{
      ref: any;
      data: Project;
      ts: number;
    }>("projects", id);
    console.log(record);
    return record;
  }

  async createProject(resource: Project, preserveRef: boolean = false) {
    const newRecord = await this.helper.CreateRecord<{
      ref: any;
      data: Project;
      ts: number;
    }>("projects", resource);
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
      } as { ref: any; data: Project; ts: number };
    }
  }

  async updateProject(id: string, update: Partial<Project>) {
    const recordUpdate = await this.helper.UpdateRecord<Partial<Project>>(
      "projects",
      id,
      update
    );
    if (this.dev) {
      console.log("=== Record Updated ===");
      console.log(recordUpdate);
    }
    return recordUpdate;
  }

  async replaceProject(id: string, replacement: Project) {
    const recordReplace = (await this.helper.ReplaceRecord<Project>(
      "projects",
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

  async deleteProject(id: string) {
    const response = (await this.helper.DeleteRecord("projects", id)) as any;
    if (this.dev) {
      console.log("=== Record Deleted ===");
      console.log(response);
    }
    return {
      ...response,
      ref: response.ref.toString(),
    };
  }

  async listProjects(page: Pagination) {
    const response = await this.helper.ListRecordInIndex(
      "all_projects",
      "projects",
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

  async getByProjectName(name: string, page: Pagination) {
    const response = await this.helper.SearchRecordInIndex(
      "projects_by_name",
      "projects",
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

  async getByProjectLanguage(language: string, page: Pagination) {
    const response = await this.helper.SearchRecordInIndex(
      "projects_by_language",
      "projects",
      [language],
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

  async listProjectLanguages() {
    return this.helper.GetUniqueValues<string[]>({
      index: "all_projects",
      path: "languages",
    });
  }
}

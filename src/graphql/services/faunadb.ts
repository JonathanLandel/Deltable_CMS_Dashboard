import faunadb from "faunadb";

type Client = faunadb.Client;
var q = faunadb.query;

function dotPath(path: string) {
  if (path === "ref")
    return {
      field: ["ref"],
    };
  else if (path === "ts")
    return {
      field: ["ts"],
    };
  if (path && typeof path === "string") {
    return {
      field: ["data", ...(path.includes(".") ? path.split(".") : [path])],
    };
  } else {
    return {
      field: [path],
    };
  }
}

export class Helper {
  private q: typeof faunadb.query;
  private client: Client;

  constructor({ q, client }: { q: typeof faunadb.query; client: Client }) {
    this.q = q;
    this.client = client;
  }

  /**
   *
   * @param {string} name
   */
  public async CreateCollection(name: string) {
    return this.client.query(q.CreateCollection({ name }));
  }

  /**
   *
   * @param {string} collection
   * @param {any} record
   */
  public async CreateRecord<T>(collection: string, record: any) {
    return this.client.query<T>(
      q.Create(q.Collection(collection), { data: record })
    );
  }

  /**
   *
   * @param {string} collection
   * @param {string} id
   */
  public async GetRecordInCollection<T>(collection: string, id: string) {
    return this.client.query<T>(q.Get(q.Ref(q.Collection(collection), id)));
  }

  /**
   *
   * @param {string} collectio collection name
   * @param {string} id record id
   * @param {any} update JSON of update
   */
  public async UpdateRecord<T>(collectio: string, id: string, update: T) {
    return this.client.query<T>(
      q.Update(q.Ref(q.Collection(collectio), id), {
        data: update,
      })
    );
  }

  /**
   *
   * @param {string} collection collection name
   * @param {string} id record id
   * @param {any} newRecord new record definition
   */
  public async ReplaceRecord<T>(collection: string, id: string, newRecord: T) {
    return this.client.query<T>(
      q.Replace(q.Ref(q.Collection(collection), id), {
        data: newRecord,
      })
    );

    // You can record yourself coding!
  }

  /**
   * deletes a record
   * @param {string} collection collection name
   * @param {string} id record id
   */
  async DeleteRecord<T>(collection: string, id: string) {
    return this.client.query<T>(q.Delete(q.Ref(q.Collection(collection), id)));
  }

  /**
   *
   * @param index
   */
  async ListRecordInIndex<T>(
    index: string,
    collection: string,
    token: {
      pageSize: number;
      after?: string;
      before?: string;
    }
  ) {
    const size = token && token.pageSize ? token.pageSize : 10;
    const response = await this.client.query<{ data: T }>(
      q.Map(
        q.Paginate(q.Match(q.Index(index)), {
          size,
          ...(token && token.after
            ? {
                after: q.Ref(q.Collection(collection), token.after),
              }
            : {}),
          ...(token && token.before
            ? {
                before: q.Ref(q.Collection(collection), token.before),
              }
            : {}),
        }),
        q.Lambda("X", q.Get(q.Var("X")))
      )
    );
    return response.data;
  }

  /**
   *
   * @param index
   */
  async SearchRecordInIndex<T>(
    index: string,
    collection: string,
    search: any[],
    token: {
      pageSize: number;
      after?: string;
      before?: string;
    }
  ) {
    const size = token && token.pageSize ? token.pageSize : 10;
    const response = await this.client.query<{ data: T }>(
      q.Map(
        q.Paginate(q.Match(q.Index(index), ...search), {
          size,
          ...(token && token.after
            ? {
                after: q.Ref(q.Collection(collection), token.after),
              }
            : {}),
          ...(token && token.before
            ? {
                before: q.Ref(q.Collection(collection), token.before),
              }
            : {}),
        }),
        q.Lambda("X", q.Get(q.Var("X")))
      )
    );
    return response.data;
  }

  async GetUniqueValues<T>({ path, index }: { path: string; index: string }) {
    return this.client.query<T>(
      q.Union(
        q.Select(
          "data",
          q.Map(
            q.Paginate(q.Match(q.Index(index))),
            q.Lambda(
              "item",
              q.Select(path, q.Select("data", q.Get(q.Var("item"))))
            )
          )
        )
      )
    );
  }

  /**
   *
   * @param terms Array of term dot paths
   * @param values Array of values dot paths
   */
  async CreateIndex({
    name,
    collection,
    terms,
    values,
  }: {
    name: string;
    collection: string;
    terms: string[];
    values: string[];
  }) {
    const _terms = terms.map((term) => dotPath(term));
    const _values = values.map((value) => dotPath(value));
    return this.client.query(
      q.CreateIndex({
        name: name,
        source: q.Collection(collection),
        ...(_terms && _terms.length > 0 ? { terms: _terms } : {}),
        ...(_values && _values.length > 0 ? { values: _values } : {}),
      })
    );
  }
}

export class Driver {
  public q: typeof faunadb.query;
  public client: Client;
  public helper: Helper;
  constructor(secret: string) {
    this.q = faunadb.query;
    this.client = new faunadb.Client({
      secret,
    });
    this.helper = new Helper({ q, client: this.client });
  }
}

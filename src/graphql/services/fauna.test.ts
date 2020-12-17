import test from "ava";
import { Driver, Helper } from "./faunadb";
import faunadb, { Client } from "faunadb";

export class FaunaContainer {
  public q: typeof faunadb.query;
  public client: Client;
  public helper: Helper;
  public secret: string;
  public dev: boolean;

  constructor({ secret, dev }: { secret?: string; dev?: boolean } = {}) {
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
}

var container: FaunaContainer;

test.before((t) => {
  container = new FaunaContainer();
});

test('Does Collection "Blog" Exist. ', async (t) => {
  const response = await container.client.query(
    container.q.Exists(container.q.Collection("blogs"))
  );
  t.true(response);
});

test('Does Collection "Interest" Exist. ', async (t) => {
  const response = await container.client.query(
    container.q.Exists(container.q.Collection("interests"))
  );
  t.true(response);
});

test('Does Collection "News" Exist. ', async (t) => {
  const response = await container.client.query(
    container.q.Exists(container.q.Collection("news"))
  );
  t.true(response);
});

test('Does Collection "Project" Exist. ', async (t) => {
  const response = await container.client.query(
    container.q.Exists(container.q.Collection("projects"))
  );
  t.true(response);
});

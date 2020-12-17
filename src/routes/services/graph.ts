/**
 * Headers for GraphQL Endpoint
 */
export const headers = {
  "Accept-Encoding": "gzip, deflate, br",
  "Content-Type": "application/json",
  Accept: "application/json",
  Connection: "keep-alive",
  DNT: "1",
};

/**
 * URL of GraphQL Endpoint
 */
export const url = "/graphql";

/**
 * Builds the body of a request for GraphQL
 * @param StringLiteral GraphQL Query
 */
export const gql = (strs: TemplateStringsArray, ...args: any[]) => {
  const composedString = strs.reduce((prev, cur, i) => {
    return prev + args[i - 1] + cur;
  });
  const finishedString = composedString.trim();
  return JSON.stringify({ query: finishedString });
};

/**
 *  Gets the collection
 * @param ref FaunaDB Reference String
 */
export const getIDFromRef = (ref: string) =>
  ref.split(",")[1].replace(/[ "\)]/g, "");

/**
 *  Gets the ID
 * @param ref FaunaDB Reference String
 */
export const getCollectionFromRef = (ref: string) =>
  ref.split(",")[0].split('"')[1];

/**
 *  Gets the ID and Collection
 * @param ref FaunaDB Reference String
 */
export const dereference = (ref: string) => {
  const ID = getIDFromRef(ref);
  const collection = getCollectionFromRef(ref);
  return {
    ID,
    collection,
  };
};

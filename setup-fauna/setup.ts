import { Driver, Helper } from "../src/graphql/services/faunadb";

const Schema = {
  collections: [
    {
      name: "blogs",
      indexes: [
        {
          name: "blogs_by_name",
          terms: ["name"],
          values: [],
        },
        {
          name: "all_blogs",
          terms: [],
          values: [],
        },
      ],
    },
    {
      name: "resources",
      indexes: [
        {
          name: "resources_by_name",
          terms: ["name"],
          values: [],
        },
        {
          name: "resources_by_tags",
          terms: ["tags"],
          values: [],
        },
        {
          name: "all_resources",
          terms: [],
          values: [],
        },
      ],
    },
    {
      name: "news",
      indexes: [
        {
          name: "news_by_name",
          terms: ["name"],
          values: [],
        },
        {
          name: "news_by_tag",
          terms: ["tags"],
          values: [],
        },
        {
          name: "all_news",
          terms: [],
          values: [],
        },
      ],
    },
    {
      name: "projects",
      indexes: [
        {
          name: "projects_by_name",
          terms: ["name"],
          values: [],
        },
        {
          name: "projects_by_language",
          terms: ["languages"],
          values: [],
        },
        {
          name: "all_projects",
          terms: [],
          values: [],
        },
      ],
    },
  ],
};

const { q, client } = new Driver("fnAD7kp-3IACAtgFGQyYhIT6lWKbw6ejlg0-fSCw");
const h = new Helper({ q, client });

async function createCollections() {
  // Extracting the name string from the collection object
  const collections = Schema.collections.map((collection) => collection.name);

  // Create the collections inside of Fauna
  const collectionRecords = await Promise.all(
    collections.map(async (collectionName) => {
      const doesExist = await client.query(
        q.Exists(q.Collection(collectionName))
      );
      if (!doesExist) {
        const record = await h.CreateCollection(collectionName);
        return {
          name: collectionName,
          record,
        };
      } else {
        console.debug(`COLLECTION "${collectionName}" EXISTS.`);
        return {
          name: collectionName,
          exists: true,
        };
      }
    })
  );

  return collectionRecords;
}

async function createIndexes() {
  // Extracting the name string from the collection object
  const collections = Schema.collections.map((collection) => collection.name);

  // Creating a hash map where the name results in the indexes for the collection
  const indexes = Schema.collections
    .map((collection) => ({ [collection.name]: collection.indexes }))
    .reduce((prev, cur) => {
      return { ...prev, ...cur };
    }, {});

  // Create the indexes inside of Fauna
  const collectionIndexRecords = await Promise.all(
    collections.map(async (record) => {
      const collectionIndexes = indexes[record];
      return Promise.all(
        collectionIndexes.map(async (currentIndex) => {
          const doesExist = await client.query(
            q.Exists(q.Index(currentIndex.name))
          );
          if (!doesExist) {
            return h.CreateIndex({
              name: currentIndex.name,
              collection: record,
              terms: currentIndex.terms || [],
              values:
                currentIndex.values &&
                Array.isArray(currentIndex.values) &&
                currentIndex.values.length > 0
                  ? ["ref", "ts", ...currentIndex.values]
                  : [],
            });
          } else {
            console.debug(`INDEX "${currentIndex.name}" EXISTS.`);
            return {
              name: currentIndex.name,
              exists: true,
            };
          }
        })
      );
    })
  );

  return collectionIndexRecords;
}

export async function setup() {
  console.log("START");
  console.log("COLLECTIONS: START");
  const collections = await createCollections();
  console.log("COLLECTIONS: END");
  console.log("INDEXES: START");
  const indexes = await createIndexes().catch((err) => {
    console.log(err);
  });
  console.log("INDEXES: END");
  console.log("DONE");
  return {
    collections,
    indexes,
  };
}

setup();

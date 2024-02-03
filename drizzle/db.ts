import { drizzle } from 'drizzle-orm/postgres-js';
import postgres from 'postgres';
import type { PostgresJsDatabase } from "drizzle-orm/postgres-js";

import * as schema from "./schema"

const connectionString = process.env.NEON_URL!

// Fix for "sorry, too many clients already"
declare global {
  // eslint-disable-next-line no-var -- only var works here
  var db: PostgresJsDatabase<typeof schema> | undefined;
}

// query client
let db: PostgresJsDatabase<typeof schema>;
if (process.env.NODE_ENV === "production") {
  const client = postgres(connectionString, {
    connect_timeout: 10000,
    idle_timeout: 3000,
    max: 20,
  });

  db = drizzle(client, {
    schema,
  });
} else {
  if (!global.db) {
    const client = postgres(connectionString, {
      connect_timeout: 10000,
      idle_timeout: 3000,
      max: 20,
    });

    global.db = drizzle(client, {
      schema,
      logger: {
        logQuery: (query) => {
          // to remove quotes on query string, to make it more readable
          console.log({ query: query.replace(/\"/g, "") });
        },
      },
    });
  }

  db = global.db;
}


type DbInstance = typeof db;

export { db };
export type { DbInstance };
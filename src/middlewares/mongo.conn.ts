import { MongoClient } from "../../deps.ts";
import logger from "./logger.ts";

const client = new MongoClient();

try {
  await client.connect({
    db: "deno",
    tls: true,
    servers: [
      {
        host: "cluster0-shard-00-02.bpobi.mongodb.net",
        port: 27017,
      },
    ],
    credential: {
      username: "norber",
      password: "CoderHouse33",
      db: "deno",
      mechanism: "SCRAM-SHA-1",
    },
  });
  logger.debug(`Base de datos conectada`);
} catch (error) {
  logger.error(error);
}

const dbConn = client.database("deno");

export default dbConn;
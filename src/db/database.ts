import postgres from "postgres";
import { env } from "bun";

let { PGHOST, PGDATABASE, PGUSER, PGPASSWORD, ENDPOINT_ID } = env;

export const sql = postgres({
  host: PGHOST,
  database: PGDATABASE,
  username: PGUSER,
  password: PGPASSWORD,
  port: 5432,
  ssl: 'require',
  connection: {
    options: `project=${ENDPOINT_ID}`,
  },
});

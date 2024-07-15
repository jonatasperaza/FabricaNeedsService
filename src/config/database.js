import postgres from "postgres";
import dotenv from "dotenv";

dotenv.config();

const {
  PGHOST,
  PGDATABASE,
  PGUSER,
  PGPASSWORD,
  ENDPOINT_ID,
} = process.env;

const sql = postgres({
  host: PGHOST,
  database: PGDATABASE,
  username: PGUSER,
  password: PGPASSWORD,
  port: 5432,
  ssl: { rejectUnauthorized: false },
  connection: {
    options: `project=${ENDPOINT_ID}`,
  },
});

export default sql;

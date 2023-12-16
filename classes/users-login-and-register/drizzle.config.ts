import type { Config } from "drizzle-kit";

export default {
  schema: "./db/schemas/index.ts",
  out: "./drizzle",
  driver: "mysql2",
  dbCredentials: {
    host: process.env.MYSQL_HOST as string,
    user: process.env.DB_USER,
    password: process.env.MYSQL_ROOT_PASSWORD,
    database: process.env.MYSQL_DATABASE as string,
    port: Number(process.env.MYSQL_PORT),
  },
  verbose: true,
  strict: true,
} satisfies Config;

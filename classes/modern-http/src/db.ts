import { drizzle } from "drizzle-orm/mysql2";
import mysql from "mysql2/promise";

const connection = mysql.createPool({
  host: process.env.MYSQL_HOST,
  user: process.env.DB_USER,
  database: process.env.MYSQL_DATABASE,
  password: process.env.MYSQL_ROOT_PASSWORD,
  port: +(process.env.MYSQL_PORT || ""),
});

export const db = drizzle(connection);

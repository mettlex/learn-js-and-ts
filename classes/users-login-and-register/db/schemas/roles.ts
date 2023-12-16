import { int, mysqlEnum, mysqlTable } from "drizzle-orm/mysql-core";

export const Role = mysqlTable("roles", {
  id: int("id").primaryKey().autoincrement(),
  title: mysqlEnum("title", ["admin", "moderator", "member"]).notNull(),
});

export type Role = typeof Role.$inferInsert;

import Database from "better-sqlite3";

const DATABASE_FILENAME = "database.db";
export const TABLE_NAME = "notes";

export const db = new Database(DATABASE_FILENAME, {
  verbose: console.log,
});

db.pragma("journal_mode = WAL");

console.log(db.prepare(`select * from ${TABLE_NAME};`).all());

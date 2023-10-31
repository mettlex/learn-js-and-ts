import { bigint, datetime, mysqlTable, text } from "drizzle-orm/mysql-core";
import { eq, sql } from "drizzle-orm";

import { db } from "./db";

const TABLE_NAME = "notes";

export const notesSchema = mysqlTable(TABLE_NAME, {
  id: bigint("id", { mode: "number" }).primaryKey().autoincrement(),
  text: text("text").notNull(),
  date: datetime("date")
    .notNull()
    .default(sql`CURRENT_TIMESTAMP`),
});

export type Note = typeof notesSchema.$inferSelect;

export async function createNote(note: Partial<Note>): Promise<Note> {
  if (!note.date || !note.text) {
    throw new Error("note date & text required");
  }

  await db.insert(notesSchema).values({
    text: note.text,
    date: note.date,
  });

  const result = (
    await db
      .select()
      .from(notesSchema)
      .where(eq(notesSchema.text, note.text))
      .limit(1)
  )[0];

  console.log(result);

  return result;
}

export async function getAll() {
  const result = await db.select().from(notesSchema).limit(100);

  console.log({ result });

  return result;
}

export async function deleteNote(id: number) {
  console.log(await db.delete(notesSchema).where(eq(notesSchema.id, id)));
}

export async function getNote(id: number): Promise<Note | undefined> {
  return (
    await db.select().from(notesSchema).where(eq(notesSchema.id, id)).limit(1)
  )[0];
}

export async function updateNote(id: number, note: Partial<Note>) {
  const found = await getNote(id);

  if (!found) {
    return;
  }

  await db
    .update(notesSchema)
    .set({
      date: note.date,
      text: note.text,
    })
    .where(eq(notesSchema.id, id));
}

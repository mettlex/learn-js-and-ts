import { bigint, datetime, mysqlTable, text } from "drizzle-orm/mysql-core";
import { eq, gt, sql } from "drizzle-orm";

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

export async function getPaginated(
  input:
    | {
        limit: number;
        page: number;
      }
    | {
        id: number;
        limit: number;
      },
) {
  let result: Note[] = [];

  if ("page" in input && input.page > 0) {
    result = await db
      .select()
      .from(notesSchema)
      .limit(input.limit)
      .offset((input.page - 1) * input.limit);
  } else if ("id" in input) {
    result = await db
      .select()
      .from(notesSchema)
      .where(gt(notesSchema.id, input.id))
      .limit(input.limit);
  }

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

export async function getNoteByText(text: string): Promise<Note | undefined> {
  return (
    await db
      .select()
      .from(notesSchema)
      .where(eq(notesSchema.text, text))
      .limit(1)
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

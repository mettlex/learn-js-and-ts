import { db, TABLE_NAME } from "./db";

const result = db
  .prepare(
    `create table if not exists ${TABLE_NAME} (
  id INTEGER PRIMARY KEY AUTOINCREMENT,
  text TEXT,
  date DATETIME DEFAULT CURRENT_TIMESTAMP
);`,
  )
  .run();

console.log(result);

console.log(
  db
    .prepare(
      `SELECT name FROM sqlite_schema WHERE type='table' AND name NOT LIKE 'sqlite_%';`,
    )
    .all(),
);

export type Note = {
  id: number;
  text: string;
  date: Date;
};

const filename = "notes.json";

export const notes: Note[] = getAll();

export function createNote(note: Partial<Note>): Note {
  if (!note.date || !note.text) {
    throw new Error("note date & text required");
  }

  console.log(
    db
      .prepare(
        `insert into ${TABLE_NAME} (text, date) values ('${note.text}', ${note.date});`,
      )
      .run(),
  );

  const newNote = db
    .prepare(`select * from ${TABLE_NAME} where text=?;`)
    .get(note.text) as {
    id: number;
    text: string;
    date: number;
  };

  return {
    ...newNote,
    date: new Date(newNote.date),
  };
}

export function getAll() {
  // LIST
  const result = db.prepare(`select * from ${TABLE_NAME};`).all() as {
    id: number;
    text: string;
    date: number;
  }[];

  return result.map((x) => ({
    ...x,
    date: new Date(x.date),
  }));
}

export function deleteNote(id: number) {
  console.log(db.prepare(`delete from ${TABLE_NAME} where id=?;`).run(id));
}

export function getNote(id: number): Note | null {
  const note = db
    .prepare(`select * from ${TABLE_NAME} where id=?;`)
    .get(id) as { id: number; text: string; date: number } | null;

  return !note
    ? null
    : {
        ...note,
        date: new Date(note.date),
      };
}

export function updateNote(id: number, note: Partial<Note>) {
  const found = getNote(id);

  if (!found) {
    return;
  }

  if (note.date) {
    db.prepare(`update ${TABLE_NAME} set date=? where id=?`).run(
      note.date.getTime(),
      id,
    );
  }

  if (note.text) {
    db.prepare(`update ${TABLE_NAME} set text=? where id=?`).run(note.text, id);
  }
}

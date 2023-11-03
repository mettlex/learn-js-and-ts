import { serve } from "@hono/node-server";
import { Hono } from "hono";
import { secureHeaders } from "hono/secure-headers";
import { cors } from "hono/cors";
import { compress } from "hono/compress";
import {
  createNote,
  Note,
  deleteNote,
  getAll,
  getNote,
  updateNote,
} from "./notes";
import { getSingleNoteSchema, updateNoteRequestSchema } from "./schema";

const app = new Hono();

app.use("*", secureHeaders());

app.use("*", compress());

app.use(
  "*",
  cors({
    origin: ["https://seen.red"],
  }),
);

// TODO: Pagination

app.get("/", async (c) => c.json(await getAll())); // LIST

app.get("/:id", async (c) => {
  // READ
  const id = parseInt(c.req.param("id"));

  const result = getSingleNoteSchema.safeParse(id);

  if (!result.success) {
    return c.json({ message: JSON.parse(result.error.message)[0].message });
  }

  const found = await getNote(id);

  if (!found) {
    c.status(404);
    return c.json({ message: "note not found" });
  }

  return c.json(found);
});

app.put("/:id", async (c) => {
  // UPDATE
  const id = parseInt(c.req.param("id"));
  const data = await c.req.json();

  const result = getSingleNoteSchema.safeParse(id);

  if (!result.success) {
    return c.json({ message: JSON.parse(result.error.message)[0].message });
  }

  const validation = updateNoteRequestSchema.safeParse(data);

  if (!validation.success) {
    return c.json({ message: JSON.parse(validation.error.message)[0] });
  }

  const validatedData = validation.data;

  const notes = await getAll();

  const foundIndex = notes.findIndex((n) => n.id === id);

  if (foundIndex === -1) {
    c.status(404);
    return c.json({ message: "note not found" });
  }

  notes[foundIndex] = {
    id: notes[foundIndex].id,
    text: validatedData.text || notes[foundIndex].text,
    date: new Date(validatedData.date || notes[foundIndex].date.getTime()),
  };

  await updateNote(notes[foundIndex].id, notes[foundIndex]);

  return c.json({ message: "successfully updated" });
});

app.delete("/:id", async (c) => {
  // DELETE
  const id = c.req.param("id");

  const notes = await getAll();

  const foundIndex = notes.findIndex((n) => n.id === parseInt(id));

  if (foundIndex === -1) {
    c.status(404);
    return c.json({ message: "note not found" });
  }

  notes.splice(foundIndex, 1);

  deleteNote(parseInt(id));

  return c.json({ message: "successfully deleted" });
});

app.post("/", async (c) => {
  // CREATE
  const data = await c.req.json();

  // TODO: request data validation

  const notes = await getAll();

  if (notes.find((x) => x.text === data.text)) {
    return c.json({ message: "already exists" });
  }

  const newNote: Partial<Note> = {
    text: data.text,
    date: new Date(data.date),
  };

  const dbNote = await createNote(newNote);

  console.log({ dbNote });

  notes.push(dbNote);

  return c.json({ message: "successfully added the note", note: dbNote });
});

serve(app);

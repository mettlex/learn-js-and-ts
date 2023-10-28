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

const app = new Hono();

app.use("*", secureHeaders());

app.use("*", compress());

app.use(
  "*",
  cors({
    origin: ["https://seen.red"],
  }),
);

app.get("/", async (c) => c.json(await getAll())); // LIST

app.get("/:id", async (c) => {
  // READ
  const id = c.req.param("id");

  const found = await getNote(parseInt(id));

  if (!found) {
    c.status(404);
    return c.json({ message: "note not found" });
  }

  return c.json(found);
});

app.put("/:id", async (c) => {
  // UPDATE
  const id = c.req.param("id");
  const data = await c.req.json();

  const notes = await getAll();

  const foundIndex = notes.findIndex((n) => n.id === parseInt(id));

  if (foundIndex === -1) {
    c.status(404);
    return c.json({ message: "note not found" });
  }

  notes[foundIndex] = {
    id: notes[foundIndex].id,
    text: data.text || notes[foundIndex].text,
    date: new Date(data.date) || notes[foundIndex].date,
  };

  updateNote(notes[foundIndex].id, notes[foundIndex]);

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

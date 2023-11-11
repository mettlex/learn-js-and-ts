import { serve } from "@hono/node-server";
import { Hono } from "hono";
import { secureHeaders } from "hono/secure-headers";
import { cors } from "hono/cors";
import { compress } from "hono/compress";
import {
  createNote,
  Note,
  deleteNote,
  getNote,
  updateNote,
  getPaginated,
  getNoteByText,
} from "./notes";
import {
  createNoteRequestSchema,
  getPaginatedNotesSchema,
  getSingleNoteSchema,
  updateNoteRequestSchema,
} from "./schema";

const app = new Hono();

app.use("*", secureHeaders());

app.use("*", compress());

app.use(
  "*",
  cors({
    origin: ["https://seen.red"],
  }),
);

app.post("/", async (c) => {
  // CREATE
  const data = await c.req.json();

  const validation = createNoteRequestSchema.safeParse(data);

  if (!validation.success) {
    c.status(400);
    return c.json({
      success: false,
      message: JSON.parse(validation.error.message)[0],
    });
  }

  const note = await getNoteByText(validation.data.text);

  if (note) {
    c.status(400);
    return c.json({ message: "already exists" });
  }

  const newNote: Partial<Note> = {
    text: data.text,
    date: new Date(data.date),
  };

  const dbNote = await createNote(newNote);

  console.log({ dbNote });

  return c.json({ message: "successfully added the note", note: dbNote });
});

app.get("/:id", async (c) => {
  // READ

  const result = getSingleNoteSchema.safeParse(c.req.param("id"));

  if (!result.success) {
    c.status(400);
    return c.json({
      success: false,
      message: JSON.parse(result.error.message)[0].message,
    });
  }

  const id = result.data;

  let note: Note | undefined;
  let success = true;
  let message = "A note found";

  try {
    note = await getNote(id);
  } catch (error) {
    c.status(500);
    success = false;
    message = "Error connecting to the database.";
    console.error("Error connecting to DB.", error);
    return c.json({ success, message });
  }

  if (!note) {
    c.status(404);
    return c.json({ success: false, message: "note not found" });
  }

  return c.json({ success, message, note });
});

app.put("/:id", async (c) => {
  // UPDATE
  const result = getSingleNoteSchema.safeParse(c.req.param("id"));

  let data: unknown;

  try {
    data = await c.req.json();
  } catch (error) {
    console.error(error);
    c.status(400);
    return c.json({
      success: false,
      message: "Invalid JSON in the request body",
    });
  }

  if (!result.success) {
    c.status(400);
    return c.json({
      success: false,
      message: JSON.parse(result.error.message)[0].message,
    });
  }

  const validation = updateNoteRequestSchema.safeParse(data);

  if (!validation.success) {
    c.status(400);
    return c.json({
      success: false,
      message: JSON.parse(validation.error.message)[0],
    });
  }

  const validatedData = validation.data;

  let success = true;
  let message = "Successfully retrieved";
  let note: Note | undefined;

  try {
    const found = await getNote(result.data);

    if (!found) {
      c.status(404);
      return c.json({ message: "note not found" });
    }

    note = found;
  } catch (error) {
    c.status(500);
    success = false;
    message = "Error retrieving notes";
    console.error("Error connecting to DB.", error);
    return c.json({ success, message });
  }

  note = {
    id: note.id,
    text: validatedData.text || note.text,
    date: new Date(validatedData.date || note.date.getTime()),
  };

  try {
    await updateNote(note.id, note);
  } catch (error) {
    console.error(error);
    c.status(500);
    return c.json({ success: false, message: "Error in updating the note" });
  }

  return c.json({ success: true, message: "successfully updated" });
});

app.delete("/:id", async (c) => {
  // DELETE
  const id = c.req.param("id");

  const result = getSingleNoteSchema.safeParse(id);

  if (!result.success) {
    c.status(400);
    return c.json({
      success: false,
      message: JSON.parse(result.error.message)[0].message,
    });
  }

  const found = await getNote(result.data);

  if (!found) {
    c.status(404);
    return c.json({ message: "note not found" });
  }

  deleteNote(parseInt(id));

  return c.json({ message: "successfully deleted" });
});

app.get("/", async (c) => {
  let success = true;
  let message = "Successfully retrieved";
  let notes: Note[];

  const limit = parseInt(c.req.query("limit") || "10");
  const page = parseInt(c.req.query("page") || "0");
  const id = parseInt(c.req.query("id") || "0");

  const result = getPaginatedNotesSchema.safeParse({ limit, page, id });

  if (!result.success) {
    c.status(400);
    return c.json({
      success: false,
      message: JSON.parse(result.error.message)[0].message,
    });
  }

  try {
    notes = await getPaginated(
      result.data as Parameters<typeof getPaginated>[0],
    );
  } catch (error) {
    c.status(500);
    success = false;
    message = "Error retrieving notes";
    console.error("Error connecting to DB.", error);
    notes = [];
  }

  return c.json({ success, message, notes });
}); // LIST

serve(app);

import { z } from "zod";
import { notesSchema } from "./notes";

export const getSingleNoteSchema = z.number().int().positive();

export const updateNoteRequestSchema = z.object({
  text: z.string().min(5).max(5000).optional(),
  date: z.number().int().min(Date.now()).optional(),
});

export const notes = notesSchema;

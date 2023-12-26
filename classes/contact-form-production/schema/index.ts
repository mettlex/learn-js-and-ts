import { z } from "zod";

export const contactFormSchema = z.object({
  email: z.string().email().min(1).max(1000),
  message: z.string().min(10).max(1000),
});

export type ContactFormSchema = z.infer<typeof contactFormSchema>;

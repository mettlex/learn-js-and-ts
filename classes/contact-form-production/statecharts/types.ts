import { ContactFormSchema } from "@/schema";

export type GlobalContext = ContactFormSchema & {
  error: string;
};

export type ContactFormEventData = ContactFormSchema;

export type GlobalEvent =
  | { type: "form.submit"; data: ContactFormEventData }
  | { type: "form.submit_again"; data: ContactFormEventData };

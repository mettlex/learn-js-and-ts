import { fakeDb } from "@/lib/db";
import { hash } from "@/lib/noob-hashing";
import { z } from "zod";

const registerRequestSchema = z.object({
  email: z.string().min(1).max(255),
  password: z.string().min(1).max(255),
});

export async function POST(request: Request) {
  const body = await request.json();

  const result = registerRequestSchema.safeParse(body);

  const headers = new Headers();
  headers.set("content-type", "application/json");

  if (!result.success) {
    return new Response(JSON.stringify(result.error.errors[0]), {
      headers,
      status: 400,
    });
  }

  // TODO: Use drizzle orm
  if (fakeDb.get(result.data.email)) {
    return new Response(JSON.stringify({ error: "User already exists" }), {
      status: 400,
    });
  }

  // TODO: hash password using argon2 or bcrypt
  result.data.password = await hash(result.data.password);

  // TODO: Use drizzle orm
  fakeDb.set(result.data.email, result.data);

  return new Response(JSON.stringify({ message: "Registration successful" }));
}

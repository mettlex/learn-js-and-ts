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

  console.log({ email: result.data.email });

  // TODO: Use drizzle orm
  const userInDatabase = fakeDb.get(result.data.email);

  console.log({ userInDatabase });

  if (!userInDatabase) {
    return new Response(JSON.stringify({ error: "User not found" }), {
      status: 404,
    });
  }

  // TODO: hash password using argon2 or bcrypt
  result.data.password = await hash(result.data.password);

  if (result.data.password !== userInDatabase.password) {
    return new Response(JSON.stringify({ error: "password did not match" }), {
      status: 401,
    });
  }

  return new Response(JSON.stringify({ message: "Login successful" }));
}

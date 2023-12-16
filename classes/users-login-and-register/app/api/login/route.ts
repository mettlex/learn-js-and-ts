import { fakeDb } from "@/lib/db";
import { hash } from "@/lib/noob-hashing";
import { z } from "zod";

const registerRequestSchema = z.object({
  email: z.string().min(1).max(255),
  password: z.string().min(1).max(255),
});

export async function POST(request: Request) {
  let body;

  try {
    body = await request.json();
  } catch (error) {
    return Response.json({ error: "Invalid JSON" }, { status: 400 });
  }

  const result = registerRequestSchema.safeParse(body);

  if (!result.success) {
    return Response.json(result.error.errors[0], {
      status: 400,
    });
  }

  console.log({ email: result.data.email });

  // TODO: Use drizzle orm
  const userInDatabase = fakeDb.get(result.data.email);

  console.log({ userInDatabase });

  if (!userInDatabase) {
    return Response.json(
      { error: "User not found" },
      {
        status: 404,
      },
    );
  }

  // TODO: hash password using argon2 or bcrypt
  result.data.password = await hash(result.data.password);

  if (result.data.password !== userInDatabase.password) {
    return Response.json(
      { error: "password did not match" },
      {
        status: 401,
      },
    );
  }

  return Response.json({ message: "Login successful" });
}

import { NextResponse } from "next/server";
import { Resend } from "resend";

import { getResult } from "@/lib/result";
import { contactFormSchema } from "@/schema";

const resend = new Resend(process.env.RESEND_API_KEY);

export async function POST(request: Request) {
  const result = await getResult(() => request.json());

  if (result.isErr) {
    console.error(result.error);
    // early return
    return NextResponse.json(
      { error: "Internal Server Error" },
      {
        status: 500,
      },
    );
  }

  const body = result.value;

  const validatedResult = await getResult(() => contactFormSchema.parse(body));

  if (validatedResult.isErr) {
    console.error(validatedResult.error);
    // early return
    return NextResponse.json(
      { error: validatedResult.error.message },
      {
        status: 400,
      },
    );
  }

  const data = validatedResult.value;

  const emailResult = await getResult(() =>
    resend.emails.send({
      from: process.env.MY_FROM_EMAIL_ADDRESS || "",
      to: process.env.MY_TO_EMAIL_ADDRESS || "",
      subject: "New Contact Form Submission",
      html: `<div><p>Email: ${data.email}</p></div><div><p>Message: ${data.message}</p></div>`,
    }),
  );

  if (emailResult.isErr) {
    console.error(emailResult.error);
    return NextResponse.json(
      { error: "Internal Server Error" },
      {
        status: 500,
      },
    );
  }

  console.log(emailResult.value);

  console.log(data);

  return NextResponse.json({ success: true });
}

"use client";

import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import * as z from "zod";

import { Button } from "@/components/ui/button";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { useState } from "react";
import { PasswordInput } from "./input";

const minLength = 2;
const maxLength = 50;
const passwordMinLength = 6;
const passwordMaxLength = 100;

const formSchema = z.object({
  email: z
    .string()
    .min(minLength, {
      message: `Email must be at least ${minLength} characters.`,
    })
    .max(maxLength, {
      message: `Email can't be more than ${maxLength} characters`,
    }),

  password: z
    .string()
    .min(passwordMinLength, {
      message: `Password must be at least ${passwordMinLength} characters.`,
    })
    .max(passwordMaxLength, {
      message: `Password can't be more than ${passwordMaxLength} characters`,
    }),
});

export function ProfileForm() {
  const [loggedIn, setLoggedIn] = useState(false);
  const [message, setMessage] = useState("");

  // 1. Define your form.
  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      email: "",
    },
  });

  // 2. Define a submit handler.
  async function onSubmit(values: z.infer<typeof formSchema>) {
    // Do something with the form values.
    // ✅ This will be type-safe and validated.
    try {
      const response = await fetch("/api/login", {
        method: "POST",
        body: JSON.stringify(values),
      });

      const result = await response.json();

      if (result.message.includes("successful")) {
        setLoggedIn(true);
        setMessage(result.message);
      }
      console.log(response);
    } catch (error) {
      console.error(error);
    }
  }

  return (
    <Form {...form}>
      <form
        onSubmit={form.handleSubmit(onSubmit)}
        className={`space-y-8 ${loggedIn ? "hidden" : ""}`}
      >
        <FormField
          control={form.control}
          name="email"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Email</FormLabel>

              <FormControl>
                <Input placeholder="Your email" {...field} />
              </FormControl>

              <FormMessage />
            </FormItem>
          )}
        />

        <FormField
          control={form.control}
          name="password"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Password</FormLabel>

              <FormControl>
                <PasswordInput
                  type="password"
                  placeholder="Your password"
                  {...field}
                />
              </FormControl>

              <FormMessage />
            </FormItem>
          )}
        />

        <Button type="submit">Submit</Button>
      </form>

      {loggedIn && <p>{message}</p>}
    </Form>
  );
}

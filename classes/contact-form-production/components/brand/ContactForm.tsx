"use client";

import { MouseEventHandler, useState } from "react";
import { useActor } from "@xstate/react";

import {
  CardHeader,
  CardContent,
  CardFooter,
  Card,
} from "@/components/ui/card";
import { Label } from "@/components/ui/label";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Button } from "@/components/ui/button";
import { machine } from "@/statecharts/definitions/contact-form";

export default function ContactForm() {
  const [state, send] = useActor(machine);
  const [email, setEmail] = useState("");
  const [message, setMessage] = useState("");

  console.log({
    current: state.value,
    context: state.context,
  });

  const handleSubmit: MouseEventHandler<HTMLButtonElement> = (event) => {
    event.preventDefault();

    if (state.matches("FormShown")) {
      send({
        type: "form.submit",
        data: {
          email,
          message,
        },
      });
    } else if (state.matches("FormError")) {
      send({
        type: "form.submit_again",
        data: {
          email,
          message,
        },
      });
    }
  };

  return (
    <Card className="p-8 space-y-6 bg-gray-800 text-white">
      <CardHeader>
        <h2 className="text-2xl font-bold">Contact Us</h2>
        <p className="text-gray-400">
          We would love to hear from you. Please fill out the form below.
        </p>
      </CardHeader>

      {state.context.error}

      {!state.matches("FormSuccess") && (
        <>
          <CardContent className="space-y-4">
            <div className="space-y-2">
              <Label className="text-gray-200" htmlFor="email">
                Email:
              </Label>
              <Input
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                className="w-full md:w-1/2 bg-gray-700 text-white placeholder-gray-500"
                id="email"
                placeholder="Enter your email"
                type="email"
              />
            </div>
            <div className="space-y-2">
              <Label className="text-gray-200" htmlFor="message">
                Message:
              </Label>
              <Textarea
                value={message}
                onChange={(e) => setMessage(e.target.value)}
                className="min-h-[200px] bg-gray-700 text-white placeholder-gray-500"
                id="message"
                placeholder="Enter your message"
              />
            </div>
          </CardContent>
          <CardFooter>
            <Button
              onClick={handleSubmit}
              className="w-full md:w-auto bg-blue-600 text-white hover:bg-blue-500"
            >
              Send Message
            </Button>
          </CardFooter>
        </>
      )}
    </Card>
  );
}

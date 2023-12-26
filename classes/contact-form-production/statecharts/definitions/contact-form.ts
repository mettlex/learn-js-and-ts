import { assign, createMachine, fromPromise } from "xstate";

import { GlobalContext, GlobalEvent } from "@/statecharts/types";
import { contactFormSchema } from "@/schema";

export const machine = createMachine(
  {
    /** @xstate-layout N4IgpgJg5mDOIC5QGED2A7ALgQwMaYAIAxVAJwFsCBZPACwEt0wA6EigZVtQHd0BiAGZlyzWAFcARuXqYA2gAYAuolAAHVLBn0MKkAA9EARgAch5gBYArJYBMxgJzyA7IfMA2S84A0IAJ6IbSzdmAGZ7c2M3QxCbQ0tjeWMAXySfNCw8QjZKGlwGJlZhTh5+IQpRSWk5Q2UkEHVNTG10XQMEVxDmeTcnHrdjJ17jYZCff3aQ4PNXG3trGxtnJ2TUkHScfGJhajpGFmyAUVJSMkFhCqkZBVq1DS0dOraneXNmN0D7GPtDe2+esaMIUszG+5jsNjC-Xk9ghKTSGA2WW2uXy+2ERxOpDO5XEl2qN3qdyaD1AbXM5k6jhiEUsTksFPMvQBCAAtHZmKZJpZ7E53PI4qY3ClVuhUBA4Lp1pkthQdnk9roGvcWo9ECy3MyWYZDMF5HrwvSnDYrMYQk44WsEdLsnLUYUOFxeIqic1WogwczAvJmLEgZYZtYTLYLVLNjaUXt7eR2GJcLg4PA6kriSrSYhnp03CEHKbLEC6dDPQNmLT+o57G4K9N7CGrWHkbsCodjmRnY1XaqEP7vdmbHTnuEnOENX5AcFXMZyYz5NzrO5hUkgA */
    id: "Contact Form Machine",
    initial: "FormShown",
    context: {
      email: "",
      message: "",
      error: "",
    },
    states: {
      FormShown: {
        on: {
          "form.submit": [
            {
              target: "FormSuccess",
              guard: "validated",
            },
            {
              target: "FormError",
            },
          ],
        },
      },
      FormSuccess: {
        entry: assign({
          email: ({ event }) => event.data.email,
          message: ({ event }) => event.data.message,
          error: "",
        }),
        invoke: {
          id: "requestApiWithFormData",
          src: "requestApiWithFormData",
          input: ({ context: { email, message } }) => ({ email, message }),
          onDone: {
            target: "FormSubmitted",
          },
          onError: {
            target: "FormSubmitFailed",
          },
        },
      },
      FormSubmitFailed: {},
      FormSubmitted: {},
      FormError: {
        on: {
          "form.submit": [
            {
              target: "FormSuccess",
              guard: "validated",
            },
            {
              target: "FormError",
            },
          ],
        },
      },
    },
    types: {
      events: {} as GlobalEvent,
      context: {} as GlobalContext,
    },
  },
  {
    actions: {},
    actors: {
      requestApiWithFormData: fromPromise(async ({ input }) => {
        const { email, message } = input as GlobalContext;

        const response = await fetch("/api/contact", {
          method: "POST",
          headers: {
            "content-type": "application/json",
          },
          body: JSON.stringify({ email, message }),
        });

        console.log(await response.json());
      }),
    },
    guards: {
      validated: ({ context, event }, params) => {
        console.log(event);
        const result = contactFormSchema.safeParse(event.data);

        if (!result.success) {
          const err = result.error.errors[0].message;

          context.error = err.replace("String", "Message");

          return false;
        }

        return true;
      },
    },
    delays: {},
  },
);

import { createActor } from "xstate";

import { machine } from "@/statecharts/definitions/contact-form";

export const actor = createActor(machine);

actor.subscribe((snapshot) => {
  console.log("Value:", snapshot.value);
});

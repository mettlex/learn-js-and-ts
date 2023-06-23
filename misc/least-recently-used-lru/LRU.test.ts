import { assertEquals } from "https://deno.land/std@0.191.0/testing/asserts.ts";
import { createLRU } from "./LRU.ts";

type User = {
  username: string;
  password: string
}

const lru = createLRU<User>({
  capacity: 4,
})

lru.set("Monir", { username: "Monir", password: "password1" })
lru.set("Mahi", { username: "Mahi", password: "password2" })
lru.set("Azmain", { username: "Azmain", password: "password3" })
lru.set("Raiyan", { username: "Raiyan", password: "password4" })

Deno.test("LRU get and set methods works", () => {
  assertEquals(lru.get("Mahi"), { username: "Mahi", password: "password2" });
})

Deno.test("Removes the least recently used", () => {
  lru.set("Arabi", { username: "Arabi", password: "password5" })

  assertEquals(lru.get("Monir"), undefined);
})

Deno.test("Moves the most recently used", () => {
  lru.get("Azmain")

  assertEquals(lru.sequence.get(lru.sequence.length() - 1), { username: "Azmain", password: "password3" })
})
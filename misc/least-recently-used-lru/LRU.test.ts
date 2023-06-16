import { assertEquals } from "https://deno.land/std@0.191.0/testing/asserts.ts";
import { createLRU } from "./LRU.ts";

type User = {
  username: string;
  password: string
}

const lru = createLRU<User>({ capacity: 4 })

lru.set("1", { username: "Monir", password: "password1" })
lru.set("2", { username: "Mahi", password: "password2" })
lru.set("3", { username: "Azmain", password: "password3" })
lru.set("4", { username: "Raiyan", password: "password4" })

Deno.test("LRU get and set methods works", () => {
  assertEquals(lru.get("2"), { username: "Mahi", password: "password2" });
})

Deno.test("Removes the least recently used", () => {
  lru.set("5", { username: "Arabi", password: "password5" })

  assertEquals(lru.get("1"), undefined);
})
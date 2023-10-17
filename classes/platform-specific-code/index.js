import { fibonacciFast as denoFn } from "./deno.js";
import { fibonacciFast as bunFn } from "./bun.js";

const n = 50_000;

if ("Bun" in globalThis) {
  console.log(bunFn(n));
} else if ("Deno" in globalThis) {
  console.log(denoFn(n));
}

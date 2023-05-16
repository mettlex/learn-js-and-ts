async function createHash(password) {
  const encoder = new TextEncoder();

  const encoded = encoder.encode(password);

  const hash = await crypto.subtle.digest("SHA-512", encoded);

  return encodeHex(hash);
}

function encodeHex(data) {
  return Array.from(new Uint8Array(data))
    .map((c) => c.toString(16).padStart(2, "0"))
    .join("");
}

const password = "Hello 😉";

createHash(password);

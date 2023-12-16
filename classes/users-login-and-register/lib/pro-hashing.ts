import argon2 from "argon2";

export async function hash(password: string): Promise<string> {
  try {
    const hash = await argon2.hash(password);
    return hash;
  } catch (err) {
    console.error(err);
    throw new Error("Error hashing password");
  }
}

export async function verify(hash: string, password: string): Promise<boolean> {
  try {
    const match = await argon2.verify(hash, password);
    return match;
  } catch (err) {
    console.error(err);
    return false;
  }
}

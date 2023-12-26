import { Result } from "@badrap/result";

type Fn<T> = () => Promise<T> | T;

export async function getResult<T = unknown>(f: Fn<T>) {
  try {
    const result = await f();
    return Result.ok(result);
  } catch (error) {
    return Result.err(error as Error);
  }
}

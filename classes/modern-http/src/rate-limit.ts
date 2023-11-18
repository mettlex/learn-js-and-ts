import { IncomingMessage, ServerResponse } from "http";

export function rateLimit(options: RateLimitOptions = {}) {
  let { windowMs, max, store } = options;

  if (!store) {
    store = new Map<string, number>();
  }

  if (!windowMs) {
    windowMs = 60 * 1000; // 1 minute
  }

  if (!max) {
    max = 10;
  }

  return {
    passed: (options: RateLimitPassedOptions): boolean => {
      if (!store || !windowMs || !max) {
        return false;
      }

      const { req, res } = options;

      const ip =
        req.headers["x-forwarded-for"] instanceof Array
          ? req.headers["x-forwarded-for"][0]
          : req.headers["x-forwarded-for"] || req.socket.remoteAddress;

      if (!ip) {
        res.statusCode = 500;
        res.end("Internal Server Error. IP address not found.");
        return false;
      }

      const current = store.get(ip);

      if (!current) {
        store.set(ip, 1);
        res.setHeader("X-RateLimit-Remaining", max - 1);
        return true;
      }

      if (current > max) {
        res.statusCode = 429;
        res.setHeader("X-RateLimit-Remaining", 0);
        res.setHeader("Retry-After", Math.ceil(windowMs / 1000));
        res.setHeader("Content-Type", "application/json");
        res.end(JSON.stringify({ message: "Too many requests" }));
        return false;
      }

      store.set(ip, current + 1);
      res.setHeader("X-RateLimit-Remaining", max - current);

      const tid = setTimeout(() => {
        store?.delete(ip);
        clearTimeout(tid);
      }, windowMs);

      return true;
    },
  };
}

type RateLimitOptions = {
  windowMs?: number;
  max?: number;
  store?: Store;
};

type RateLimitPassedOptions = {
  req: IncomingMessage;
  res: ServerResponse<IncomingMessage>;
};

export type Store = {
  set: (key: string, value: number) => void;
  get: (key: string) => number | undefined;
  delete: (key: string) => void;
};

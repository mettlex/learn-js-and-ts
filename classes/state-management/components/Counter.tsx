"use client";

import { countAtom } from "@/store";
import { useAtom } from "jotai";

export default function Counter() {
  const [count, setCount] = useAtom(countAtom);

  return (
    <div
      onClick={() => {
        setCount(count + 1);
      }}
      className="cursor-pointer max-w-5xl w-full items-center justify-between font-mono text-sm lg:flex"
    >
      Count: {count}
    </div>
  );
}

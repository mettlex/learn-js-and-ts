"use client";

import { countAtom } from "@/store";
import { useAtomValue } from "jotai";

export default function Counter2() {
  const count = useAtomValue(countAtom);

  return (
    <div className="cursor-pointer max-w-5xl w-full items-center justify-between font-mono text-sm lg:flex">
      Second Counter: {count}
    </div>
  );
}

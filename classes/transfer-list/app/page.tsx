"use client";

import { useState } from "react";

export default function Home() {
  const [count, setCount] = useState(0);

  return (
    <main className="flex min-h-screen flex-col items-center justify-between p-24">
      <button
        className="bg-slate-700 text-blue-300 p-4"
        onClick={() => setCount(count + 1)}
      >
        Count: {count}
      </button>
    </main>
  );
}

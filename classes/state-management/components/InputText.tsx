"use client";

import { textInputAtom } from "@/store";
import { useAtomValue, useStore } from "jotai";
import { useEffect } from "react";

export default function InputText() {
  const store = useStore();
  const value = store.get(textInputAtom);

  useEffect(() => {
    const unsub = store.sub(textInputAtom, () => {
      console.log("textInputAtom changed", store.get(textInputAtom));
    });

    return () => {
      unsub();
    };
  }, [store]);

  return (
    <input
      required
      value={value}
      onChange={(event) => {
        store.set(textInputAtom, event.target.value);
      }}
      className="border border-gray-400 rounded-lg px-4 py-2 bg-slate-800"
    />
  );
}

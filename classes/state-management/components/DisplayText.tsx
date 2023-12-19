"use client";

import { shoppingListAtom, transformedShoppingListAtom } from "@/store";
import { useAtom, useAtomValue } from "jotai";

export default function DisplayList() {
  const list = useAtomValue(transformedShoppingListAtom);
  const [_, setList] = useAtom(shoppingListAtom);

  return (
    <div>
      {list.map((item, i) => {
        return (
          <div key={`${i}${item}`} className="flex flex-row w-full">
            <span className="flex flex-col mr-10">{item}</span>

            <button
              onClick={() => {
                list.splice(i, 1);
                setList([...list]);
              }}
            >
              🚮
            </button>
          </div>
        );
      })}
    </div>
  );
}

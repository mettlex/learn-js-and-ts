"use client";

import { useAtom } from "jotai";
import InputText from "@/components/InputText";
import { shoppingListAtom, textInputAtom } from "@/store";
import { DevTools } from "jotai-devtools";

export default function ShoppingListForm() {
  const [textInput, setInputText] = useAtom(textInputAtom);
  const [previousList, setShoppingList] = useAtom(shoppingListAtom);

  return (
    <form
      className="m-10"
      onSubmit={(event) => {
        event.preventDefault();
        setShoppingList([textInput, ...previousList]);
        setInputText("");
      }}
    >
      <InputText />

      {/* <DevTools isInitialOpen theme="dark" /> */}
    </form>
  );
}

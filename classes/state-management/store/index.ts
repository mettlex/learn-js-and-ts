import { atom, createStore } from "jotai";
import { atomWithStorage } from "jotai/utils";

export const myStore = createStore();

export const countAtom = atom(0);
export const textInputAtom = atomWithStorage("savedText", "");
export const shoppingListAtom = atomWithStorage<string[]>("shoppingList", []);

export const transformedShoppingListAtom = atom((get) =>
  get(shoppingListAtom).map((item) => transform(item).toUpperCase()),
);

function transform(text: string) {
  const numbers = {
    zero: "0",
    one: "1",
    two: "2",
    three: "3",
    four: "4",
    five: "5",
    six: "6",
    seven: "7",
    eight: "8",
    nine: "9",
  };

  const newText = Object.entries(numbers).reduce(
    (acc, [key, value]) => acc.replaceAll(key, value),
    text,
  );

  return newText.toUpperCase();
}

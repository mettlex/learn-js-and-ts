"use client";

import { useState } from "react";
import { ControlButtons } from "./control-button";
import { ItemType } from "./item";
import { LeftList } from "./left-list";
import { RightList } from "./right-list";

const initialLeftListItems: ItemType[] = [
  { label: "Mom", selected: true },
  { label: "Dad", selected: false },
  { label: "Sister", selected: false },
  { label: "Brother", selected: true },
];

const initialRightListItems: ItemType[] = [
  { label: "Grandpa", selected: true },
  { label: "Grandma", selected: false },
];

export function TransferList() {
  const [leftListItems, setLeftListItems] = useState(initialLeftListItems);
  const [rightListItems, setRightListItems] = useState(initialRightListItems);

  function transferToRight() {
    const selectedItems = leftListItems.filter(
      (item) => item.selected === true,
    );

    setRightListItems((rightListItems) => [
      ...rightListItems,
      ...selectedItems,
    ]);

    setLeftListItems((leftListItems) =>
      leftListItems.filter((item) => item.selected === false),
    );
  }

  function transferToLeft() {
    const selectedItems = rightListItems.filter(
      (item) => item.selected === true,
    );

    setLeftListItems((leftListItems) => [...leftListItems, ...selectedItems]);

    setRightListItems((rightListItems) =>
      rightListItems.filter((item) => item.selected === false),
    );
  }

  return (
    <>
      <div>
        <p className="underline mb-4">Left List</p>
        <LeftList items={leftListItems} />
      </div>

      <ControlButtons
        transferToLeft={transferToLeft}
        transferToRight={transferToRight}
      />

      <div>
        <p className="underline mb-4">Right List</p>
        <RightList items={rightListItems} />
      </div>
    </>
  );
}

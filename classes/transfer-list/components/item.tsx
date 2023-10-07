"use client";

// useState is a hook
import { useState } from "react";

// Model
export type ItemType = {
  label: string;
  selected: boolean;
};

export type ItemProps = {
  item: ItemType;
  onSelectionChange: (item: ItemType) => void;
};

export function Item({ item, onSelectionChange }: ItemProps) {
  // State
  const [isChecked, setIsChecked] = useState(item.selected);

  // State is for variables that change
  // Props is for variables that never change

  // View
  return (
    <section className="flex flex-row gap-4">
      <input
        // Update
        onChange={() => {
          setIsChecked(!isChecked);
          onSelectionChange(item);
        }}
        type="checkbox"
        checked={isChecked}
      />
      <label>{item.label}</label>
    </section>
  );
}

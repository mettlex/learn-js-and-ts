"use client";

// useState is a hook
import { useState } from "react";

// Model
export type ItemProps = {
  label: string;
  selected: boolean;
};

export function Item({ label, selected }: ItemProps) {
  // State
  const [isChecked, setIsChecked] = useState(selected);

  // State is for variables that change
  // Props is for variables that never change

  // View
  return (
    <section className="flex flex-row gap-4">
      <input
        // Update
        onChange={() => {
          setIsChecked(!isChecked);
        }}
        type="checkbox"
        checked={isChecked}
      />
      <label>{label}</label>
    </section>
  );
}

import { ControlButtons } from "@/components/control-button";
import { Item, ItemProps } from "@/components/item";

const leftListItems: ItemProps[] = [
  { label: "Mom", selected: true },
  { label: "Dad", selected: false },
  { label: "Sister", selected: false },
  { label: "Brother", selected: true },
];

const rightListItems: ItemProps[] = [
  { label: "Grandpa", selected: true },
  { label: "Grandma", selected: false },
];

export default function Home() {
  return (
    <main className="flex flex-col min-h-screen items-center justify-center gap-4">
      <p className="text-2xl">Transfer List</p>

      <div className="flex flex-row gap-10">
        <div>
          <p className="underline mb-4">List 1</p>
          <LeftList />
        </div>

        <ControlButtons />

        <div>
          <p className="underline mb-4">List 2</p>
          <RightList />
        </div>
      </div>
    </main>
  );
}
function LeftList() {
  return (
    <section>
      {leftListItems.map((item, i) => (
        <Item
          key={item.label + i}
          label={item.label}
          selected={item.selected}
        />
      ))}
    </section>
  );
}
function RightList() {
  return (
    <section>
      {rightListItems.map((item, i) => (
        <Item
          key={item.label + i}
          label={item.label}
          selected={item.selected}
        />
      ))}
    </section>
  );
}

import { Item, ItemType } from "./item";

type LeftListProps = {
  items: ItemType[];
};

export function LeftList({ items }: LeftListProps) {
  return (
    <section>
      {items.map((item, i) => (
        <Item
          key={item.label + i}
          item={item}
          onSelectionChange={(item) => {
            item.selected = !item.selected;
          }}
        />
      ))}
    </section>
  );
}

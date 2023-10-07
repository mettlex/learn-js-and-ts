import { Item, ItemType } from "./item";

type RightListProps = {
  items: ItemType[];
};

export function RightList({ items }: RightListProps) {
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

```

<Home /> ---> Next.js as Page
|
|
|
v
<TransferList />
|
|
|
v
1. <LeftList />
    |
    | state: leftListItems
    | prop: onSelectionChange
    v
    <Item /> (map over items)
      |
      | state: isSelected
      | update: setIsSelected()
      | update: onSelectionChange
      v

2. <ControlButtons />


3. <RightList />
    |
    | state: rightListItems
    | prop: onSelectionChange
    v
    <Item /> (map over items)

```
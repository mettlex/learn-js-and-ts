1. TransferList Component

   - Holds the state for `leftListItems` and `rightListItems`.
   - Passes these states down to the `LeftList` and `RightList` components as props.
   - Passes `transferToRight` and `transferToLeft` functions to `ControlButtons` component.

2. LeftList/RightList Components

   - Receives item list state from `TransferList` component.
   - Maps over the item list and passes each item's data (label and selected status) to the `Item` component, along with the `onSelectionChange` function.

3. Item Component

   - Receives item data and `onSelectionChange` function from `LeftList` or `RightList` component.
   - When the checkbox is clicked, it calls the `onSelectionChange` function, which updates the `selected` status of the item in the parent component's state.

4. ControlButtons Component
   - Receives `transferToRight` and `transferToLeft` functions from `TransferList` component.
   - When a button is clicked, it calls the corresponding function, which updates the state in the `TransferList` component.

```
TransferList Component
│
├───> Passes state and state setters to LeftList/RightList Components
│     │
│     ├───> Passes item data and onSelectionChange function to Item Component
│     │     │
│     │     └───> Calls onSelectionChange when checkbox is clicked
│     │         │
│     │         └───> Updates state in LeftList/RightList Components
│     │
│     └───> Calls state setters when ControlButtons are clicked
│         │
│         └───> Updates state in TransferList Component
│
└───> Passes transferToRight and transferToLeft functions to ControlButtons Component
      │
      └───> Calls corresponding function when button is clicked
          │
          └───> Updates state in TransferList Component
```

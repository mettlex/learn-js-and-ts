import DisplayList from "@/components/DisplayText";
import ShoppingListForm from "@/components/ShoppingListForm";
import { Provider } from "jotai";

export default function Home() {
  return (
    <main className="flex flex-col items-center justify-center">
      <Provider>
        <ShoppingListForm />
        <DisplayList />
      </Provider>
    </main>
  );
}

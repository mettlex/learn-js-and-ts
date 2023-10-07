import { TransferList } from "@/components/transfer-list";

export default function Home() {
  return (
    <main className="flex flex-col min-h-screen items-center justify-center gap-4">
      <p className="text-2xl">Transfer List</p>
      <div className="flex flex-row gap-10">
        <TransferList />
      </div>
    </main>
  );
}

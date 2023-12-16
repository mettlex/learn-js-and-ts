import { UserButton, currentUser } from "@clerk/nextjs";

export default async function HomePage() {
  const user = await currentUser();

  const fullName = `${user?.firstName} ${
    (user?.lastName && user?.lastName) || ""
  }`;

  return (
    <main className="flex min-h-screen flex-col items-center justify-center">
      <UserButton afterSignOutUrl="/" />

      {(user?.firstName && fullName) || user?.username}
    </main>
  );
}

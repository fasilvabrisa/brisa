import { getSession } from "@/app/lib/auth";
import { redirect } from "next/navigation";
import Link from "next/link";
import { logout } from "@/app/actions/auth";

export default async function DashboardLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const session = await getSession();
  if (!session) redirect("/login");

  return (
    <div className="min-h-screen flex flex-col">
      <header className="border-b border-gray-200 bg-white px-6 py-4 flex items-center justify-between sticky top-0 z-10">
        <Link href="/dashboard" className="text-xl font-bold tracking-tight">
          BRISA
        </Link>
        <div className="flex items-center gap-4">
          <Link
            href="/dashboard/new"
            className="rounded-lg bg-blue-600 px-4 py-2 text-sm font-medium text-white hover:bg-blue-700 transition-colors"
          >
            + Novo pedido
          </Link>
          <span className="text-sm text-gray-500 hidden sm:block">
            {session.name}
          </span>
          <form action={logout}>
            <button
              type="submit"
              className="text-sm text-gray-500 hover:text-gray-900 transition-colors"
            >
              Sair
            </button>
          </form>
        </div>
      </header>
      <main className="flex-1 px-6 py-8 max-w-4xl mx-auto w-full">
        {children}
      </main>
    </div>
  );
}

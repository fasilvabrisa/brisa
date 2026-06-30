import Link from "next/link";
import { getSession } from "@/app/lib/auth";
import { redirect } from "next/navigation";

export default async function Home() {
  const session = await getSession();
  if (session) redirect("/dashboard");

  return (
    <main className="flex min-h-screen flex-col">
      <header className="border-b border-gray-200 bg-white px-6 py-4 flex items-center justify-between">
        <span className="text-xl font-bold tracking-tight">BRISA</span>
        <div className="flex gap-3">
          <Link
            href="/login"
            className="rounded-lg border border-gray-300 px-4 py-2 text-sm font-medium hover:bg-gray-50 transition-colors"
          >
            Entrar
          </Link>
          <Link
            href="/signup"
            className="rounded-lg bg-blue-600 px-4 py-2 text-sm font-medium text-white hover:bg-blue-700 transition-colors"
          >
            Criar conta
          </Link>
        </div>
      </header>

      <section className="flex flex-1 flex-col items-center justify-center px-6 py-24 text-center">
        <h1 className="text-5xl font-bold tracking-tight text-gray-900 sm:text-6xl">
          Help every work.
        </h1>
        <p className="mt-6 max-w-xl text-lg text-gray-500">
          Precisa de ajuda com um projeto? Ou quer oferecer seus serviços?
          BRISA conecta quem tem trabalho com quem pode ajudar.
        </p>
        <div className="mt-10 flex gap-4">
          <Link
            href="/signup"
            className="rounded-lg bg-blue-600 px-6 py-3 text-base font-semibold text-white shadow-sm hover:bg-blue-700 transition-colors"
          >
            Começar agora
          </Link>
          <Link
            href="/login"
            className="rounded-lg border border-gray-300 px-6 py-3 text-base font-semibold text-gray-700 hover:bg-gray-50 transition-colors"
          >
            Já tenho conta
          </Link>
        </div>
      </section>

      <section className="border-t border-gray-200 bg-white px-6 py-16">
        <div className="mx-auto max-w-4xl">
          <h2 className="text-center text-2xl font-semibold text-gray-900">
            Como funciona
          </h2>
          <div className="mt-10 grid grid-cols-1 gap-8 sm:grid-cols-3">
            <div className="text-center">
              <div className="mx-auto mb-4 flex h-12 w-12 items-center justify-center rounded-full bg-blue-100 text-2xl">
                📋
              </div>
              <h3 className="font-semibold text-gray-900">Poste sua demanda</h3>
              <p className="mt-2 text-sm text-gray-500">
                Descreva o que você precisa e encontre a pessoa certa para ajudar.
              </p>
            </div>
            <div className="text-center">
              <div className="mx-auto mb-4 flex h-12 w-12 items-center justify-center rounded-full bg-blue-100 text-2xl">
                🔍
              </div>
              <h3 className="font-semibold text-gray-900">Explore pedidos</h3>
              <p className="mt-2 text-sm text-gray-500">
                Veja o que as pessoas precisam e ofereça suas habilidades.
              </p>
            </div>
            <div className="text-center">
              <div className="mx-auto mb-4 flex h-12 w-12 items-center justify-center rounded-full bg-blue-100 text-2xl">
                🤝
              </div>
              <h3 className="font-semibold text-gray-900">Conecte-se</h3>
              <p className="mt-2 text-sm text-gray-500">
                Demonstre interesse e coloque a mão na massa.
              </p>
            </div>
          </div>
        </div>
      </section>

      <footer className="border-t border-gray-200 px-6 py-6 text-center text-sm text-gray-400">
        © 2026 BRISA. Todos os direitos reservados.
      </footer>
    </main>
  );
}

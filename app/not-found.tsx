import Link from "next/link";

export default function NotFound() {
  return (
    <div className="flex min-h-screen flex-col items-center justify-center px-6 text-center">
      <div className="text-7xl font-bold text-gray-200">404</div>
      <h1 className="mt-4 text-2xl font-bold text-gray-900">
        Página não encontrada
      </h1>
      <p className="mt-3 text-gray-500">
        O endereço que você buscou não existe.
      </p>
      <Link
        href="/dashboard"
        className="mt-8 rounded-lg bg-blue-600 px-5 py-2.5 text-sm font-medium text-white hover:bg-blue-700 transition-colors"
      >
        Ir ao painel
      </Link>
    </div>
  );
}

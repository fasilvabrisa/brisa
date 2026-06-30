import Link from "next/link";
import { NewRequestForm } from "./NewRequestForm";

export const metadata = {
  title: "Novo pedido — BRISA",
};

export default function NewRequestPage() {
  return (
    <div>
      <div className="mb-6">
        <Link
          href="/dashboard"
          className="text-sm text-gray-500 hover:text-gray-900 transition-colors"
        >
          ← Voltar ao painel
        </Link>
        <h1 className="mt-3 text-2xl font-bold text-gray-900">
          Novo pedido de trabalho
        </h1>
        <p className="mt-1 text-sm text-gray-500">
          Descreva o que você precisa e encontre quem pode ajudar.
        </p>
      </div>
      <div className="rounded-xl border border-gray-200 bg-white p-6 shadow-sm max-w-2xl">
        <NewRequestForm />
      </div>
    </div>
  );
}

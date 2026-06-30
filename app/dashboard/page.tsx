import Link from "next/link";
import { listRequests } from "@/app/lib/db";
import { getSession } from "@/app/lib/auth";
import { CATEGORIES } from "@/app/lib/definitions";

function categoryLabel(value: string): string {
  return CATEGORIES.find((c) => c.value === value)?.label ?? value;
}

function timeAgo(ts: number): string {
  const diff = Date.now() - ts;
  const minutes = Math.floor(diff / 60000);
  if (minutes < 1) return "agora";
  if (minutes < 60) return `há ${minutes}min`;
  const hours = Math.floor(minutes / 60);
  if (hours < 24) return `há ${hours}h`;
  const days = Math.floor(hours / 24);
  return `há ${days}d`;
}

export const metadata = {
  title: "Painel — BRISA",
};

export default async function DashboardPage() {
  const session = await getSession();
  const requests = listRequests();

  return (
    <div>
      <div className="flex items-center justify-between mb-6">
        <h1 className="text-2xl font-bold text-gray-900">Pedidos de trabalho</h1>
        <span className="text-sm text-gray-500">{requests.length} pedido{requests.length !== 1 ? "s" : ""}</span>
      </div>

      {requests.length === 0 && (
        <div className="rounded-xl border border-dashed border-gray-300 bg-white p-12 text-center">
          <p className="text-gray-500 mb-4">Nenhum pedido ainda. Seja o primeiro!</p>
          <Link
            href="/dashboard/new"
            className="rounded-lg bg-blue-600 px-5 py-2.5 text-sm font-medium text-white hover:bg-blue-700 transition-colors"
          >
            Criar pedido
          </Link>
        </div>
      )}

      <div className="space-y-3">
        {requests.map((req) => (
          <Link
            key={req.id}
            href={`/dashboard/${req.id}`}
            className="block rounded-xl border border-gray-200 bg-white p-5 hover:border-blue-300 hover:shadow-sm transition-all"
          >
            <div className="flex items-start justify-between gap-3">
              <div className="flex-1 min-w-0">
                <div className="flex items-center gap-2 flex-wrap">
                  <span className="inline-flex items-center rounded-full bg-blue-50 px-2.5 py-0.5 text-xs font-medium text-blue-700">
                    {categoryLabel(req.category)}
                  </span>
                  {req.location && (
                    <span className="text-xs text-gray-400">📍 {req.location}</span>
                  )}
                  {req.userId === session?.userId && (
                    <span className="text-xs text-gray-400">(seu)</span>
                  )}
                </div>
                <h2 className="mt-2 font-semibold text-gray-900 truncate">{req.title}</h2>
                <p className="mt-1 text-sm text-gray-500 line-clamp-2">{req.description}</p>
              </div>
            </div>
            <div className="mt-3 flex items-center justify-between">
              <span className="text-xs text-gray-400">{req.userName}</span>
              <span className="text-xs text-gray-400">{timeAgo(req.createdAt)}</span>
            </div>
          </Link>
        ))}
      </div>
    </div>
  );
}

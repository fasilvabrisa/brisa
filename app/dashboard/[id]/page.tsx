import { notFound } from "next/navigation";
import Link from "next/link";
import {
  findRequestById,
  listInterestsByRequest,
} from "@/app/lib/db";
import { getSession } from "@/app/lib/auth";
import { CATEGORIES } from "@/app/lib/definitions";
import { InterestButton } from "./InterestButton";

function categoryLabel(value: string): string {
  return CATEGORIES.find((c) => c.value === value)?.label ?? value;
}

function formatDate(ts: number): string {
  return new Date(ts).toLocaleDateString("pt-BR", {
    day: "2-digit",
    month: "long",
    year: "numeric",
  });
}

export default async function RequestDetailPage({
  params,
}: {
  params: Promise<{ id: string }>;
}) {
  const { id } = await params;
  const request = findRequestById(id);
  if (!request) notFound();

  const session = await getSession();
  const interests = listInterestsByRequest(id);
  const hasInterest = session
    ? interests.some((i) => i.userId === session.userId)
    : false;
  const isOwner = session?.userId === request.userId;

  return (
    <div>
      <div className="mb-6">
        <Link
          href="/dashboard"
          className="text-sm text-gray-500 hover:text-gray-900 transition-colors"
        >
          ← Voltar ao painel
        </Link>
      </div>

      <div className="rounded-xl border border-gray-200 bg-white p-6 shadow-sm">
        <div className="flex items-start justify-between gap-4">
          <div className="flex-1">
            <div className="flex items-center gap-2 flex-wrap">
              <span className="inline-flex items-center rounded-full bg-blue-50 px-2.5 py-0.5 text-xs font-medium text-blue-700">
                {categoryLabel(request.category)}
              </span>
              {request.location && (
                <span className="text-xs text-gray-400">📍 {request.location}</span>
              )}
            </div>
            <h1 className="mt-3 text-2xl font-bold text-gray-900">{request.title}</h1>
          </div>
          {!isOwner && session && (
            <InterestButton
              requestId={id}
              hasInterest={hasInterest}
              count={interests.length}
            />
          )}
        </div>

        <div className="mt-4 text-sm text-gray-400">
          Publicado por <span className="text-gray-600 font-medium">{request.userName}</span>{" "}
          em {formatDate(request.createdAt)}
        </div>

        <div className="mt-6 border-t border-gray-100 pt-6">
          <h2 className="text-sm font-semibold text-gray-700 mb-2">Descrição</h2>
          <p className="text-gray-700 whitespace-pre-wrap leading-relaxed">
            {request.description}
          </p>
        </div>
      </div>

      {isOwner && interests.length > 0 && (
        <div className="mt-6">
          <h2 className="text-lg font-semibold text-gray-900 mb-3">
            Interessados ({interests.length})
          </h2>
          <div className="space-y-2">
            {interests.map((interest) => (
              <div
                key={interest.id}
                className="rounded-xl border border-gray-200 bg-white px-5 py-4 flex items-center gap-3"
              >
                <div className="h-9 w-9 rounded-full bg-blue-100 flex items-center justify-center text-sm font-semibold text-blue-700">
                  {interest.userName.charAt(0).toUpperCase()}
                </div>
                <div>
                  <p className="font-medium text-gray-900">{interest.userName}</p>
                  <p className="text-xs text-gray-400">
                    Demonstrou interesse em {formatDate(interest.createdAt)}
                  </p>
                </div>
              </div>
            ))}
          </div>
        </div>
      )}

      {isOwner && interests.length === 0 && (
        <div className="mt-6 rounded-xl border border-dashed border-gray-300 p-8 text-center">
          <p className="text-gray-400 text-sm">Nenhum interessado ainda.</p>
        </div>
      )}

      {!isOwner && session && !hasInterest && (
        <div className="mt-6 rounded-xl border border-blue-100 bg-blue-50 p-5 text-center">
          <p className="text-sm text-blue-700 mb-3">
            Você pode ajudar com este pedido?
          </p>
          <InterestButton
            requestId={id}
            hasInterest={hasInterest}
            count={interests.length}
          />
        </div>
      )}
    </div>
  );
}

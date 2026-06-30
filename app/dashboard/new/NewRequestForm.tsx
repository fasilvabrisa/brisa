"use client";

import { useActionState } from "react";
import { postRequest } from "@/app/actions/requests";
import { RequestFormState, CATEGORIES } from "@/app/lib/definitions";

const initialState: RequestFormState = undefined;

export function NewRequestForm() {
  const [state, formAction, pending] = useActionState(postRequest, initialState);

  return (
    <form action={formAction} className="space-y-5">
      {state?.message && (
        <div className="rounded-lg bg-red-50 border border-red-200 px-4 py-3 text-sm text-red-700">
          {state.message}
        </div>
      )}

      <div>
        <label htmlFor="title" className="block text-sm font-medium text-gray-700 mb-1">
          Título do pedido <span className="text-red-500">*</span>
        </label>
        <input
          id="title"
          name="title"
          type="text"
          required
          maxLength={100}
          className="w-full rounded-lg border border-gray-300 px-3 py-2.5 text-sm focus:border-blue-500 focus:outline-none focus:ring-1 focus:ring-blue-500"
          placeholder="Ex: Preciso de um designer para criar meu logo"
        />
        {state?.errors?.title && (
          <p className="mt-1 text-xs text-red-600">{state.errors.title[0]}</p>
        )}
      </div>

      <div>
        <label htmlFor="category" className="block text-sm font-medium text-gray-700 mb-1">
          Categoria <span className="text-red-500">*</span>
        </label>
        <select
          id="category"
          name="category"
          required
          className="w-full rounded-lg border border-gray-300 px-3 py-2.5 text-sm focus:border-blue-500 focus:outline-none focus:ring-1 focus:ring-blue-500 bg-white"
        >
          <option value="">Selecione uma categoria…</option>
          {CATEGORIES.map((cat) => (
            <option key={cat.value} value={cat.value}>
              {cat.label}
            </option>
          ))}
        </select>
        {state?.errors?.category && (
          <p className="mt-1 text-xs text-red-600">{state.errors.category[0]}</p>
        )}
      </div>

      <div>
        <label htmlFor="location" className="block text-sm font-medium text-gray-700 mb-1">
          Localização <span className="text-gray-400 text-xs">(opcional)</span>
        </label>
        <input
          id="location"
          name="location"
          type="text"
          maxLength={100}
          className="w-full rounded-lg border border-gray-300 px-3 py-2.5 text-sm focus:border-blue-500 focus:outline-none focus:ring-1 focus:ring-blue-500"
          placeholder="Ex: São Paulo, SP (ou Remoto)"
        />
        {state?.errors?.location && (
          <p className="mt-1 text-xs text-red-600">{state.errors.location[0]}</p>
        )}
      </div>

      <div>
        <label htmlFor="description" className="block text-sm font-medium text-gray-700 mb-1">
          Descrição <span className="text-red-500">*</span>
        </label>
        <textarea
          id="description"
          name="description"
          required
          rows={5}
          maxLength={2000}
          className="w-full rounded-lg border border-gray-300 px-3 py-2.5 text-sm focus:border-blue-500 focus:outline-none focus:ring-1 focus:ring-blue-500 resize-none"
          placeholder="Descreva detalhadamente o que você precisa, prazos, orçamento estimado…"
        />
        {state?.errors?.description && (
          <p className="mt-1 text-xs text-red-600">{state.errors.description[0]}</p>
        )}
      </div>

      <div className="flex gap-3 pt-2">
        <button
          type="submit"
          disabled={pending}
          className="flex-1 rounded-lg bg-blue-600 px-4 py-2.5 text-sm font-semibold text-white hover:bg-blue-700 disabled:opacity-60 disabled:cursor-not-allowed transition-colors"
        >
          {pending ? "Publicando…" : "Publicar pedido"}
        </button>
      </div>
    </form>
  );
}

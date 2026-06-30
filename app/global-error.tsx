"use client";

import { useEffect } from "react";

export default function GlobalError({
  error,
  unstable_retry,
}: {
  error: Error & { digest?: string };
  unstable_retry: () => void;
}) {
  useEffect(() => {
    console.error(error);
  }, [error]);

  return (
    <html lang="pt-BR">
      <body className="flex min-h-screen flex-col items-center justify-center bg-gray-50 px-6 text-center font-sans">
        <div className="text-5xl mb-6">🔥</div>
        <h1 className="text-2xl font-bold text-gray-900">
          Algo deu muito errado
        </h1>
        <p className="mt-3 text-gray-500 max-w-sm">
          Ocorreu um erro crítico. Por favor, tente novamente.
        </p>
        {error.digest && (
          <p className="mt-2 text-xs text-gray-400">Ref: {error.digest}</p>
        )}
        <button
          onClick={unstable_retry}
          className="mt-8 rounded-lg bg-blue-600 px-5 py-2.5 text-sm font-medium text-white"
        >
          Tentar novamente
        </button>
      </body>
    </html>
  );
}

import Link from "next/link";
import { getSession } from "@/app/lib/auth";
import { redirect } from "next/navigation";
import { SignupForm } from "./SignupForm";

export const metadata = {
  title: "Criar conta — BRISA",
};

export default async function SignupPage() {
  const session = await getSession();
  if (session) redirect("/dashboard");

  return (
    <div className="flex min-h-screen flex-col items-center justify-center px-6 py-12">
      <div className="w-full max-w-sm">
        <div className="mb-8 text-center">
          <Link href="/" className="text-2xl font-bold tracking-tight">
            BRISA
          </Link>
          <h1 className="mt-4 text-xl font-semibold text-gray-900">
            Crie sua conta
          </h1>
          <p className="mt-1 text-sm text-gray-500">
            Comece a encontrar ou oferecer trabalho.
          </p>
        </div>
        <div className="rounded-xl border border-gray-200 bg-white p-6 shadow-sm">
          <SignupForm />
        </div>
      </div>
    </div>
  );
}

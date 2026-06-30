"use server";

import { redirect } from "next/navigation";
import bcrypt from "bcryptjs";
import {
  SignupSchema,
  LoginSchema,
  SignupFormState,
  LoginFormState,
} from "@/app/lib/definitions";
import {
  createUser,
  findUserByEmail,
} from "@/app/lib/db";
import { createSession, deleteSession } from "@/app/lib/auth";

export async function signup(
  state: SignupFormState,
  formData: FormData
): Promise<SignupFormState> {
  const raw = {
    name: formData.get("name"),
    email: formData.get("email"),
    password: formData.get("password"),
  };

  const result = SignupSchema.safeParse(raw);
  if (!result.success) {
    return { errors: result.error.flatten().fieldErrors };
  }

  const { name, email, password } = result.data;

  const existing = findUserByEmail(email);
  if (existing) {
    return { message: "Esse e-mail já está cadastrado. Faça login." };
  }

  const passwordHash = await bcrypt.hash(password, 12);
  const user = createUser({ name, email, passwordHash });

  await createSession({ userId: user.id, email: user.email, name: user.name });
  redirect("/dashboard");
}

export async function login(
  state: LoginFormState,
  formData: FormData
): Promise<LoginFormState> {
  const raw = {
    email: formData.get("email"),
    password: formData.get("password"),
  };

  const result = LoginSchema.safeParse(raw);
  if (!result.success) {
    return { errors: result.error.flatten().fieldErrors };
  }

  const { email, password } = result.data;

  const user = findUserByEmail(email);
  if (!user) {
    return { message: "E-mail ou senha incorretos." };
  }

  const valid = await bcrypt.compare(password, user.passwordHash);
  if (!valid) {
    return { message: "E-mail ou senha incorretos." };
  }

  await createSession({ userId: user.id, email: user.email, name: user.name });
  redirect("/dashboard");
}

export async function logout(): Promise<void> {
  await deleteSession();
  redirect("/login");
}

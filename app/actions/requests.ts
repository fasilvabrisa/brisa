"use server";

import { redirect } from "next/navigation";
import { revalidatePath } from "next/cache";
import { RequestSchema, RequestFormState } from "@/app/lib/definitions";
import {
  createRequest,
  createInterest,
  deleteInterest,
  findInterest,
  findRequestById,
} from "@/app/lib/db";
import { getSession } from "@/app/lib/auth";

export async function postRequest(
  state: RequestFormState,
  formData: FormData
): Promise<RequestFormState> {
  const session = await getSession();
  if (!session) {
    redirect("/login");
  }

  const raw = {
    title: formData.get("title"),
    description: formData.get("description"),
    category: formData.get("category"),
    location: formData.get("location"),
  };

  const result = RequestSchema.safeParse(raw);
  if (!result.success) {
    return { errors: result.error.flatten().fieldErrors };
  }

  createRequest({
    userId: session.userId,
    userName: session.name,
    title: result.data.title,
    description: result.data.description,
    category: result.data.category,
    location: result.data.location,
  });

  revalidatePath("/dashboard");
  redirect("/dashboard");
}

export async function toggleInterest(requestId: string): Promise<void> {
  const session = await getSession();
  if (!session) {
    redirect("/login");
  }

  const request = findRequestById(requestId);
  if (!request) return;

  if (request.userId === session.userId) return;

  const existing = findInterest(requestId, session.userId);
  if (existing) {
    deleteInterest(requestId, session.userId);
  } else {
    createInterest({
      requestId,
      userId: session.userId,
      userName: session.name,
    });
  }

  revalidatePath(`/dashboard/${requestId}`);
  revalidatePath("/dashboard");
}

import { z } from "zod";

export const SignupSchema = z.object({
  name: z
    .string()
    .min(2, { error: "Nome deve ter pelo menos 2 caracteres." })
    .trim(),
  email: z.email({ error: "Por favor, insira um e-mail válido." }).trim(),
  password: z
    .string()
    .min(8, { error: "Senha deve ter pelo menos 8 caracteres." }),
});

export const LoginSchema = z.object({
  email: z.email({ error: "Por favor, insira um e-mail válido." }).trim(),
  password: z.string().min(1, { error: "Senha é obrigatória." }),
});

export const RequestSchema = z.object({
  title: z
    .string()
    .min(5, { error: "Título deve ter pelo menos 5 caracteres." })
    .max(100, { error: "Título muito longo." })
    .trim(),
  description: z
    .string()
    .min(20, { error: "Descrição deve ter pelo menos 20 caracteres." })
    .max(2000, { error: "Descrição muito longa." })
    .trim(),
  category: z.enum(
    [
      "tecnologia",
      "design",
      "redação",
      "consultoria",
      "obras",
      "serviços",
      "outro",
    ],
    { error: "Selecione uma categoria válida." }
  ),
  location: z
    .string()
    .max(100, { error: "Localização muito longa." })
    .trim()
    .optional()
    .default(""),
});

export type SignupFormState =
  | {
      errors?: {
        name?: string[];
        email?: string[];
        password?: string[];
      };
      message?: string;
    }
  | undefined;

export type LoginFormState =
  | {
      errors?: {
        email?: string[];
        password?: string[];
      };
      message?: string;
    }
  | undefined;

export type RequestFormState =
  | {
      errors?: {
        title?: string[];
        description?: string[];
        category?: string[];
        location?: string[];
      };
      message?: string;
    }
  | undefined;

export const CATEGORIES = [
  { value: "tecnologia", label: "Tecnologia" },
  { value: "design", label: "Design" },
  { value: "redação", label: "Redação / Conteúdo" },
  { value: "consultoria", label: "Consultoria" },
  { value: "obras", label: "Obras / Reparos" },
  { value: "serviços", label: "Serviços Gerais" },
  { value: "outro", label: "Outro" },
] as const;

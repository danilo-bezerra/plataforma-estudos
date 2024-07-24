import { z } from "zod";

const stringRequired = {
  invalid_type_error: "inválido",
  required_error: "campo obrigatório",
};

const pathZod = z
  .string(stringRequired)
  .min(3, "path muito curto")
  .max(2000, "path muito longo");

export const createContentSchema = z.object({
  name: z.string(stringRequired).min(3, "muito curto").max(128, "muito longo"),
  path: pathZod,
});

/*   id: string;
    name: string;
    cover: string | null;
    path: string;
    isFavorite: boolean;
    isCompleted: boolean;
    createAt: Date;
    updatedAt: Date;*/

export const updateContentSchema = z.object({
  name: z
    .string(stringRequired)
    .min(3, "muito curto")
    .max(128, "muito longo")
    .optional(),
  path: pathZod.optional(),
  isFavorite: z.string().optional(),
  isCompleted: z.string().optional(),
});

export const updateContentSchemaForm = z.object({
  name: z
    .string(stringRequired)
    .min(3, "muito curto")
    .max(128, "muito longo")
    .optional(),
  path: pathZod.optional(),
  isFavorite: z.boolean().optional(),
  isCompleted: z.boolean().optional(),
});

export const updateFileSchema = z.object({
  isCompleted: z.boolean().optional(),
  elapsedTime: z.number().optional(),
});

export const mapPathSchema = z.object({
  path: pathZod,
});

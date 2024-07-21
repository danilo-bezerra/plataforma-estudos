import { ZodError } from "zod";

export function handleZodError(error: ZodError) {
  console.log(error.issues.map((i) => i.message));
}

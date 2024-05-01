import { PaginatedResult } from "./Result";
import { z } from "zod";

export const categorySchema = z.object({
  id: z.number(),
  title: z.string().min(1),
});

// https://zod.dev/?id=pickomit
// It's the backend's job to assign an ID to a new category.
export const newCategorySchema = categorySchema.omit({ id: true });

export type Category = z.infer<typeof categorySchema>;

export type CategoryList = PaginatedResult<Category>;

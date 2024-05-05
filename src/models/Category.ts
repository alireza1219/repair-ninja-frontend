import { PaginatedResult } from "./Result";
import { z } from "zod";

export const categorySchema = z.object({
  id: z.number().optional(),
  title: z.string().min(1, {message: "Title is required."}),
});

export type Category = z.infer<typeof categorySchema>;

export type CategoryList = PaginatedResult<Category>;

import { PaginatedResult } from "./Result";
import { z } from "zod";

export const manufacturerSchema = z.object({
  id: z.number().optional(),
  name: z.string().min(1, { message: "Name is required." }),
});

export type Manufacturer = z.infer<typeof manufacturerSchema>;

export type ManufacturerList = PaginatedResult<Manufacturer>;

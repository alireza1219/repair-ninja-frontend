import { z } from "zod";
import { customerProfileSchema } from "./Customer";

// Move this to constants directory maybe?
// I personally think it's better to keep it here.
export const SERVICE_STATUSES = [
  "R", // Received
  "I", // In Progress
  "C", // Completed
  "D", // Delivered
] as const;

// TODO: Was this approach really necessary / useful?
// I need to do more researches! :)
export const serviceListItemSchema = z.object({
  id: z.number(),
  // https://zod.dev/?id=coercion-for-primitives
  placed_at: z.coerce.date(),
  // https://zod.dev/?id=zod-enums
  service_status: z.enum(SERVICE_STATUSES),
  customer: customerProfileSchema,
  priority: z.number().min(1).max(10),
});

export type ServiceListItem = z.infer<typeof serviceListItemSchema>;

export type ServiceList = {
  count: number;
  next: string | null;
  previous: string | null;
  results: ServiceListItem[] | [];
};

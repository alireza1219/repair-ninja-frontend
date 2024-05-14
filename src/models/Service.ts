import { customerSchema } from "./Customer";
import { PaginatedResult } from "./Result";
import { repairmanSchema } from "./Repairman";
import { selectSchema } from "./ReactSelect";
import { z } from "zod";

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
  customer: customerSchema,
  priority: z.number().min(1).max(10),
});

export const basicServiceListItemSchema = z.object({
  id: z.number(),
  service_status: z.enum(SERVICE_STATUSES),
  placed_at: z.coerce.date(),
  last_update: z.coerce.date(),
  description: z.string(),
  estimation_delivery: z.coerce.date(),
});

export const serviceSchema = z.object({
  id: z.number(),
  assigned_to: z.array(repairmanSchema),
  customer: customerSchema,
  service_status: z.enum(SERVICE_STATUSES),
  placed_at: z.coerce.date(),
  last_update: z.coerce.date(),
  priority: z.number(),
  description: z.string(),
  estimation_delivery: z.coerce.date(),
});

export const serviceFormSchema = z.object({
  customer: selectSchema.required(),
  assigned_to: selectSchema.array().optional(),
  priority: selectSchema.required(),
  estimation_delivery: z.date().min(new Date(), {
    message: "Estimated Completion Date cannot be a passed date!",
  }),
  description: z.string().optional(),
});

export type ServiceListItem = z.infer<typeof serviceListItemSchema>;

export type ServiceList = PaginatedResult<ServiceListItem>;

export type BasicServiceListItem = z.infer<typeof basicServiceListItemSchema>;

export type BasicServiceList = PaginatedResult<BasicServiceListItem>;

export type Service = z.infer<typeof serviceSchema>;

export type ServiceFormData = z.infer<typeof serviceFormSchema>;

// FIXME: Better request typing after switching to own `Select Library`.
// I know I'm being `too` repetitive here :(

export type ServicePostBody = {
  customer: number;
  assigned_to: number[] | [];
  priority: number;
  estimation_delivery: string;
  description: string;
};

export type ServicePostResponse = {
  id: number;
  service_status: string;
  priority: number;
  description: string;
  estimation_delivery: string;
  customer: number;
  assigned_to: number[] | [];
};

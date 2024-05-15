import { categorySchema } from "./Category";
import { manufacturerSchema } from "./Manufacturer";
import { PaginatedResult } from "./Result";
import { z } from "zod";

// Temporarily testing this new local select schema. Might apply it globally if succeeded.
const selectSchema = z
  .object({
    value: z.number().min(1, "You must select an option."),
    label: z.string(),
  })
  .nullable()
  // Refine method lets us provide custom validation logics to zod.
  // For reference: https://zod.dev/?id=refine
  .refine((data) => data !== null, "You must select an option.");

export const serviceItemSchema = z.object({
  id: z.number(),
  name: z
    .string()
    .min(1, "Name is required.")
    .max(255, "Name cannot be longer than 255 characters."),
  serial_number: z
    .string()
    .min(1, "Serial number is required.")
    .max(255, "Serial number cannot be longer than 255 characters."),
  condition: z
    .string()
    .min(1, "Condition is required.")
    .max(255, "Condition note cannot be longer than 255 characters."),
  quantity: z.coerce.number().min(1, "Quantity cannot be less than one."),
  notes: z
    .string()
    .max(255, "A note cannot be longer than 255 characters.")
    .optional(),
  manufacturer: manufacturerSchema,
  category: categorySchema,
});

export const serviceItemFormSchema = serviceItemSchema
  .omit({ id: true, manufacturer: true, category: true })
  .extend({
    manufacturer: selectSchema,
    category: selectSchema,
  });

const serviceItemPostBodySchema = serviceItemSchema
  .omit({ id: true, manufacturer: true, category: true })
  .extend({
    manufacturer: z.number(),
    category: z.number(),
  });

const serviceItemPatchBodySchema = serviceItemSchema
  .pick({ notes: true, quantity: true })
  .partial();

export type ServiceItem = z.infer<typeof serviceItemSchema>;

export type ServiceItemList = PaginatedResult<ServiceItem>;

export type ServiceItemFormData = z.infer<typeof serviceItemFormSchema>;

export type ServiceItemPostBody = z.infer<typeof serviceItemPostBodySchema>;

export type ServiceItemPatchBody = z.infer<typeof serviceItemPatchBodySchema>;

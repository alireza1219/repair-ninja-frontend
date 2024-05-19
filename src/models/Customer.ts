import { z } from "zod";
import { userProfileSchema } from "./User";
import { PaginatedResult } from "./Result";
import { PHONE_NUMBER_REGEX } from "@/constants/RegexPattern";

export const customerSchema = z.object({
  id: z.number(),
  user_id: z.number(),
  user_profile: userProfileSchema,
  phone: z.string().regex(PHONE_NUMBER_REGEX, {
    message: "This is not a valid phone number.",
  }),
});

export const customerPostSchema = customerSchema.pick({
  user_id: true,
  phone: true,
});

export const customerPatchSchema = customerSchema.pick({
  phone: true,
});

export type Customer = z.infer<typeof customerSchema>;

export type CustomerList = PaginatedResult<Customer>;

export type CustomerPostBody = z.infer<typeof customerPostSchema>;

export type CustomerPatchBody = z.infer<typeof customerPatchSchema>;

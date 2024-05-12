import { z } from "zod";
import { userProfileSchema } from "./User";
import { PaginatedResult } from "./Result";
import { PHONE_NUMBER_REGEX } from "@/constants/RegexPattern";

export const customerSchema = z.object({
  id: z.number(),
  user_id: z.number(),
  user_profile: userProfileSchema.omit({ type: true }),
  phone: z.string().regex(PHONE_NUMBER_REGEX, {
    message: "This is not a valid phone number!",
  }),
});

export type CustomerProfile = z.infer<typeof customerSchema>;

export type CustomerList = PaginatedResult<CustomerProfile>;

import { z } from "zod";
import { userProfileSchema } from "./User";
import { PaginatedResult } from "./Result";
import { PHONE_NUMBER_REGEX } from "@/constants/RegexPattern";

export const repairmanSchema = z.object({
  id: z.number(),
  user_id: z.number(),
  user_profile: userProfileSchema.omit({ type: true }),
  phone: z.string().regex(PHONE_NUMBER_REGEX, {
    message: "This is not a valid phone number!",
  }),
});

export type Repairman = z.infer<typeof repairmanSchema>;

export type RepairmanList = PaginatedResult<Repairman>;

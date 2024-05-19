import { z } from "zod";
import { userProfileSchema } from "./User";
import { PaginatedResult } from "./Result";
import { PHONE_NUMBER_REGEX } from "@/constants/RegexPattern";

export const repairmanSchema = z.object({
  id: z.number(),
  user_id: z.number(),
  user_profile: userProfileSchema,
  phone: z.string().regex(PHONE_NUMBER_REGEX, {
    message: "This is not a valid phone number.",
  }),
});

export const repairmanPostSchema = repairmanSchema.pick({
  user_id: true,
  phone: true,
});

export const repairmanPatchSchema = repairmanSchema.pick({
  phone: true,
});

export type Repairman = z.infer<typeof repairmanSchema>;

export type RepairmanList = PaginatedResult<Repairman>;

export type RepairmanPostBody = z.infer<typeof repairmanPostSchema>;

export type RepairmanPatchBody = z.infer<typeof repairmanPatchSchema>;

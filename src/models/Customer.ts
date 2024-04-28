import { z } from "zod";
import { userProfileSchema } from "./User";

export const customerProfileSchema = z.object({
  id: z.number(),
  user_id: z.number(),
  user_profile: userProfileSchema,
  phone: z.string(), // TODO: Validation.
});

export type CustomerProfile = z.infer<typeof customerProfileSchema>;

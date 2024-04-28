import { z } from "zod";

export const userProfileSchema = z.object({
  id: z.number(),
  username: z.string(),
  email: z.nullable(z.string()),
  first_name: z.nullable(z.string()),
  last_name: z.nullable(z.string()),
});

export type UserProfile = z.infer<typeof userProfileSchema>

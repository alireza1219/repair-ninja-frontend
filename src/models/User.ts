import { z } from "zod";

export const userProfileSchema = z.object({
  id: z.number(),
  username: z.string().min(1, { message: "Username is required." }),
  email: z.string().email().min(1, { message: "Email is reuqired." }),
  first_name: z.string(),
  last_name: z.string(),
});

export const extendedUserProfileSchema = userProfileSchema.extend({
  type: z.enum(["regular", "staff", "superuser"]),
});

export const userProfilePostSchema = userProfileSchema
  .pick({
    username: true,
    email: true,
    first_name: true,
    last_name: true,
  })
  .extend({
    password: z
      .string()
      .min(8, { message: "Password must be at least 8 characters" }),
  });

export const userProfilePatchSchema = userProfileSchema.pick({
  email: true,
  first_name: true,
  last_name: true,
});

export const userProfileDeleteSchema = z.object({
  confirm: z.string().min(1, {
    message: "You must manually type the username to confirm deletion.",
  }),
});

export type UserType = "regular" | "staff" | "superuser";

export type UserProfile = z.infer<typeof userProfileSchema>;

export type ExtendedUserProfile = z.infer<typeof extendedUserProfileSchema>;

export type UserProfilePost = z.infer<typeof userProfilePostSchema>;

export type UserProfilePatch = z.infer<typeof userProfilePatchSchema>;

export type UserProfileDelete = z.infer<typeof userProfileDeleteSchema>;

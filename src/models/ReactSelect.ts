import { z } from "zod";

// I couldn't figure a better solution to this issue:
// https://github.com/JedWatson/react-select/issues/2902

export const selectSchema = z.object({
  value: z.any(),
  label: z.string(),
});

export type SelectOption = z.infer<typeof selectSchema>;

export type SelectOptions = SelectOption[];

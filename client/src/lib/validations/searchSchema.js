import { z } from "zod";

export const searchSchema = z.object({
  query: z
    .string()
    .min(1, "Search query cannot be empty")
    .max(100, "Search query is too long")
    .trim()
    .refine((val) => val.length > 0, {
      message: "Please enter a search term",
    }),
});

export const searchWithFiltersSchema = searchSchema.extend({
  category: z.string().optional(),
  level: z.string().optional(),
  priceRange: z.string().optional(),
});

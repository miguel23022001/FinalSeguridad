import { z } from "zod";

export const createPasswordSchema = z.object({
  siteName: z.string({
    required_error: "Site name is required",
  }),
  iv: z.string().optional(),
});
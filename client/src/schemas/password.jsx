import { z } from "zod";

export const passwordSchema = z.object({
  siteName: z.string({
    required_error: "SiteName is required",
  }),
  password: z.string({
    required_error: "Password is required",
  }),
});
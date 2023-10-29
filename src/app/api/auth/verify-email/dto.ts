import { z } from "zod";

export const verifyEmailDto = z.object({
  token: z.string(),
  email: z.string().email(),
});

export type VerifyEmailDto = z.infer<typeof verifyEmailDto>;

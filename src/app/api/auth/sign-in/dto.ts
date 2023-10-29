import { z } from "zod";

export const signInDto = z.object({
  identifier: z.string().trim().min(3),
  password: z.string().trim().min(6),
});

export type SignInDto = z.infer<typeof signInDto>;

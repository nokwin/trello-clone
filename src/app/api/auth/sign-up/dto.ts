import { z } from "zod";

export const signUpDto = z.object({
  email: z.string().email(),
  password: z.string().min(6).max(20),
  username: z.string().min(1).max(20),
});

export type SignUpDto = z.infer<typeof signUpDto>;

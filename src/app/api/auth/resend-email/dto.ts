import { z } from "zod";

export const resentEmailDto = z.object({
  email: z.string().trim().email(),
});

export type ResentEmailDto = z.infer<typeof resentEmailDto>;

import { z } from "zod";

export const createColumnDto = z.object({
  title: z.string().min(1).max(20),
  boardId: z.string().uuid(),
  width: z.number().min(200).default(200),
});

export type CreateColumnDto = z.infer<typeof createColumnDto>;

export const updateColumnDto = createColumnDto
  .omit({
    boardId: true,
  })
  .partial();

export type UpdateColumnDto = z.infer<typeof updateColumnDto>;

export const updateColumnsOrderDto = z.array(
  z.object({
    id: z.string().uuid(),
    order: z.number(),
  })
);

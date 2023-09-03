import { z } from "zod";

export const createColumnDto = z.object({
  title: z.string().min(1).max(20),
  boardId: z.string().uuid(),
  width: z.number().min(50).default(50),
});

export const updateColumnDto = createColumnDto
  .omit({
    boardId: true,
  })
  .partial();

export const updateColumnsOrderDto = z.array(
  z.object({
    id: z.string().uuid(),
    order: z.number(),
  })
);

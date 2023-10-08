import { z } from "zod";

export const createCardDto = z.object({
  title: z.string().min(1),
  columnId: z.string().uuid(),
});

export type CreateCardDto = z.infer<typeof createCardDto>;

export const updateCardDto = createCardDto
  .extend({
    description: z.string().nullable(),
  })
  .partial();

export type UpdateCardDto = z.infer<typeof updateCardDto>;

export const updateCardsOrderDto = z.array(
  z.object({
    id: z.string().uuid(),
    order: z.number(),
  })
);

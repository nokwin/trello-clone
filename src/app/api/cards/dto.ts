import { z } from "zod";

export const createCardDto = z.object({
  title: z.string().min(1),
  columnId: z.string().uuid(),
});

export const updateCardDto = createCardDto
  .extend({
    description: z.string().nullable(),
  })
  .partial();

export const updateCardsOrderDto = z.array(
  z.object({
    id: z.string().uuid(),
    order: z.number(),
  })
);

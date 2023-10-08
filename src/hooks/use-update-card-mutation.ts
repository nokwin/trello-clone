import { UpdateCardDto } from "@/app/api/cards/dto";
import { api } from "@/core/api";
import { Cards } from "@prisma/client";
import { useMutation, useQueryClient } from "@tanstack/react-query";

const updateCardFn = async (cardId: string, data: UpdateCardDto) => {
  const { data: card } = await api.patch<Cards>(`/api/cards/${cardId}`, data);

  return card;
};

export const useUpdateCardMutation = () => {
  const queryClient = useQueryClient();

  const mutation = useMutation({
    mutationFn: (data: { cardId: string; data: UpdateCardDto }) =>
      updateCardFn(data.cardId, data.data),
    onSuccess: (newCard, { cardId }) => {
      queryClient.setQueryData<Cards>(["card", cardId], () => newCard);

      return newCard;
    },
  });

  return mutation;
};

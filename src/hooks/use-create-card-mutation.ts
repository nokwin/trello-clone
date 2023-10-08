import { CreateCardDto } from "@/app/api/cards/dto";
import { api } from "@/core/api";
import { Cards } from "@prisma/client";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { ColumnPayload } from "./use-column-query";

const createCardFn = async (card: CreateCardDto) => {
  const { data } = await api.post<Cards>("/api/cards", card);

  return data;
};

interface UserCreateCardMutationOptions {
  columnId: string;
}

export const useCreateCardMutation = ({
  columnId,
}: UserCreateCardMutationOptions) => {
  const queryClient = useQueryClient();

  const mutation = useMutation({
    mutationFn: createCardFn,
    onSuccess: (newCard) => {
      const data = queryClient.getQueryData<ColumnPayload>([
        "column",
        columnId,
      ]);

      if (!data) {
        return;
      }

      const cards = [...data.cards];

      cards.push(newCard);

      queryClient.setQueryData<ColumnPayload>(["column", columnId], (old) => ({
        ...old!,
        cards,
      }));

      queryClient.setQueryData(["card", newCard.id], () => newCard);

      return newCard;
    },
  });

  return mutation;
};

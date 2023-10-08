import { api } from "@/core/api";
import { Cards } from "@prisma/client";
import { useQuery } from "@tanstack/react-query";

const getCardFn = async (cardId: string) => {
  const { data } = await api.get<Cards>(`/api/cards/${cardId}`);

  return data;
};

interface UseCardQueryOptions {
  id: string | null;
}

export const useCardQuery = ({ id }: UseCardQueryOptions) => {
  const query = useQuery<Cards>(["card", id], {
    enabled: !!id,
    queryFn: () => getCardFn(id!),
    refetchOnMount: false,
    refetchOnWindowFocus: false,
    refetchOnReconnect: false,
  });

  return query;
};

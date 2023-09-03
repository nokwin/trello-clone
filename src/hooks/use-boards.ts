import { api } from "@/core/api";
import { Boards } from "@prisma/client";
import { useQuery } from "@tanstack/react-query";

const getBoardsFn = async () => {
  const { data } = await api.get<Boards[]>("/api/boards");

  return data;
};

interface UseBoardsOptions {
  initialData: Boards[];
}

export const useBoardsQueryKey = ["boards"];

export const useBoards = ({ initialData }: UseBoardsOptions) => {
  const query = useQuery({
    queryKey: useBoardsQueryKey,
    queryFn: getBoardsFn,
    initialData,
  });

  return query;
};

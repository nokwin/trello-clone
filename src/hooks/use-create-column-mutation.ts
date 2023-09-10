import { api } from "@/core/api";
import { Columns } from "@prisma/client";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { CreateColumnDto as CreateColumnDtoOriginal } from "@/app/api/columns/dto";
import { BoardPayload } from "./use-board-query";

type CreateColumnDto = Omit<CreateColumnDtoOriginal, "width">;

const createColumnFn = async (column: CreateColumnDto) => {
  const { data } = await api.post<Columns>("/api/columns", column);

  return data;
};

interface UseCreateColumnMutationOptions {
  boardId: string;
}

export const useCreateColumnMutation = ({
  boardId,
}: UseCreateColumnMutationOptions) => {
  const queryClient = useQueryClient();

  const mutation = useMutation({
    mutationFn: createColumnFn,
    onSuccess: (newColumn) => {
      const data = queryClient.getQueryData<BoardPayload>(["board", boardId]);

      if (!data) {
        return;
      }

      const columns = [...data.columns];

      columns.push({
        ...newColumn,
        cards: [],
      });

      queryClient.setQueryData<BoardPayload>(["board", boardId], (old) => ({
        ...old!,
        columns,
      }));
    },
  });

  return mutation;
};

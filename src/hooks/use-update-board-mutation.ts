import { UpdateBoardDto } from "@/app/api/boards/dto";
import { api } from "@/core/api";
import { Boards } from "@prisma/client";
import { useMutation, useQueryClient } from "@tanstack/react-query";

const updateBoardFn = async (boardId: string, data: UpdateBoardDto) => {
  const { data: board } = await api.patch<Boards>(
    `/api/boards/${boardId}`,
    data
  );

  return board;
};

export const useUpdateBoardMutation = () => {
  const queryClient = useQueryClient();

  const mutation = useMutation({
    mutationFn: (data: { boardId: string; data: UpdateBoardDto }) =>
      updateBoardFn(data.boardId, data.data),
    onMutate: async (data) => {
      const previousBoard = queryClient.getQueryData(["board", data.boardId]);

      queryClient.setQueryData(["board", data.boardId], (old) => ({
        ...old!,
        ...data.data,
      }));

      return { previousBoard };
    },
  });

  return mutation;
};

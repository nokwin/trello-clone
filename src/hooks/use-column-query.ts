import { api } from "@/core/api";
import { Prisma } from "@prisma/client";
import { useQuery } from "@tanstack/react-query";

export type ColumnPayload = Prisma.ColumnsGetPayload<{
  include: { cards: true };
}>;

const getColumnFn = async (columnId: string) => {
  const { data } = await api.get<ColumnPayload>(`/api/columns/${columnId}`);

  return data;
};

interface UseColumnQueryOptions {
  initialData: ColumnPayload;
}

export const useColumnQuery = ({ initialData }: UseColumnQueryOptions) => {
  const query = useQuery<ColumnPayload>(["column", initialData.id], {
    queryFn: () => getColumnFn(initialData.id),
    initialData,
    refetchOnMount: false,
    refetchOnWindowFocus: false,
    refetchOnReconnect: false,
  });

  return query;
};

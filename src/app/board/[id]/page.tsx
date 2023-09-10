import { ColumnsList } from "@/components";
import { prisma } from "@/core/prisma";
import { notFound } from "next/navigation";

export const revalidate = 0;

interface PageParams {
  id: string;
}

interface PageProps {
  params: PageParams;
}

export default async function BoardPage(props: PageProps) {
  const board = await prisma.boards.findUnique({
    where: {
      id: props.params.id,
    },
    include: {
      columns: {
        orderBy: {
          order: "asc",
        },
        include: {
          cards: true,
        },
      },
    },
  });

  if (!board) {
    return notFound();
  }

  return (
    <>
      <ColumnsList board={board} />
    </>
  );
}

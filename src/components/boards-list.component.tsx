"use client";

import { Boards } from "@prisma/client";
import { BoardCard } from ".";
import { useQuery } from "@tanstack/react-query";
import { useBoards } from "@/hooks/use-boards";

interface BoardsList {
  initialData: Boards[];
}

export function BoardsList({ initialData }: BoardsList) {
  const { data: boards } = useBoards({ initialData });

  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4">
      {boards.map((board) => (
        <BoardCard key={board.id} id={board.id} title={board.title} />
      ))}
    </div>
  );
}

import { BoardCard } from "@/components";
import { prisma } from "@/core/prisma";

export default async function Home() {
  const boards = await prisma.boards.findMany();

  return (
    <div className="container mx-auto">
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4">
        {boards.map((board) => (
          <BoardCard key={board.id} id={board.id} title={board.title} />
        ))}
      </div>
    </div>
  );
}

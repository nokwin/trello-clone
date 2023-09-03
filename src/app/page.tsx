import { BoardCard } from "@/components";

export default function Home() {
  return (
    <div className="container mx-auto">
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4">
        <BoardCard id="1" title="Board 1" />
        <BoardCard id="2" title="Board 2" />
      </div>
    </div>
  );
}

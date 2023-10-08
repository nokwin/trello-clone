import { boardContext } from "@/providers/board.provider";
import { Cards } from "@prisma/client";
import { useContext } from "react";

interface CardProps {
  card: Cards;
}

export function Card({ card }: CardProps) {
  const { selectCard } = useContext(boardContext);

  const handleClick = () => {
    selectCard(card.id);
  };

  return (
    <div
      className="flex items-center p-3 text-base font-bold rounded-lg group cursor-pointer hover:shadow bg-gray-600 hover:bg-gray-500 text-white"
      onClick={handleClick}
    >
      {card.title}
    </div>
  );
}

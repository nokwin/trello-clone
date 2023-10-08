"use client";

import { PropsWithChildren, createContext, useState } from "react";

interface BoardContext {
  selectedCard: string | null;

  selectCard: (id: string | null) => void;
}

export const boardContext = createContext<BoardContext>({
  selectedCard: null,
  selectCard: () => {},
});

export function BoardProvider({ children }: PropsWithChildren<{}>) {
  const [selectedCard, setSelectedCard] = useState<string | null>(null);

  const selectCard = (id: string | null) => {
    setSelectedCard(id);
  };

  return (
    <boardContext.Provider
      value={{
        selectedCard,
        selectCard,
      }}
    >
      {children}
    </boardContext.Provider>
  );
}

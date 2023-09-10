"use client";

import { useCachedBoardQuery } from "@/hooks/use-board-query";
import { useUpdateBoardMutation } from "@/hooks/use-update-board-mutation";
import clsx from "clsx";
import { useEffect, useRef, useState } from "react";
import { twMerge } from "tailwind-merge";

interface BoardTitleProps {
  boardId: string;
}

export function BoardTitle({ boardId }: BoardTitleProps) {
  const { data } = useCachedBoardQuery({ boardId });

  const [isEditing, setIsEditing] = useState(false);
  const turnOnEditing = () => {
    if (isEditing) {
      return;
    }

    setIsEditing(true);
  };

  const titleRef = useRef<HTMLHeadingElement>(null);
  useEffect(() => {
    if (data?.title && titleRef.current) {
      titleRef.current.innerText = data.title;
    }
  }, [data?.title]);

  const titleClasses = clsx({
    "cursor-pointer": !isEditing,
    "cursor-text": isEditing,
  });

  const { mutate } = useUpdateBoardMutation();
  const onBlur = () => {
    setIsEditing(false);
    mutate({
      boardId,
      data: {
        title: titleRef.current?.innerText || "Untitled",
      },
    });
  };

  return (
    <h1
      className={twMerge(
        "text-white text-4xl text-center mb-8 font-bold transition outline-none hover:bg-black/20",
        titleClasses
      )}
      contentEditable={isEditing}
      onClick={turnOnEditing}
      ref={titleRef}
      onBlur={onBlur}
    >
      {data?.title ?? ""}
    </h1>
  );
}

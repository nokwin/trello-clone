"use client";

import { useForm } from "react-hook-form";
import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import { useState } from "react";
import { useCreateBoardMutation } from "@/hooks/use-create-board-mutation";
import { Button, Input } from ".";

const createBoardSchema = z.object({
  title: z.string().min(1).max(20),
});

type CreateBoardValues = z.infer<typeof createBoardSchema>;

export function CreateBoard() {
  const [isFormOpened, setIsFormOpened] = useState(false);

  const {
    register,
    handleSubmit,
    formState: { errors, isSubmitting },
  } = useForm<CreateBoardValues>({
    resolver: zodResolver(createBoardSchema),
  });

  const { mutateAsync } = useCreateBoardMutation();

  const onSubmit = handleSubmit(async (values) => {
    await mutateAsync(values);
    setIsFormOpened(false);
  });

  const openForm = () => setIsFormOpened(true);

  return (
    <div
      className="block w-full p-6 bg-white border border-gray-200 rounded-lg shadow cursor-pointer hover:bg-gray-100 dark:bg-gray-800 dark:border-gray-700 dark:hover:bg-gray-700"
      onClick={openForm}
    >
      {isFormOpened ? (
        <form onSubmit={onSubmit} className="relative">
          <Input
            {...register("title")}
            placeholder="Enter your board title"
            error={errors.title?.message}
            disabled={isSubmitting}
            className="pr-20"
          />
          <Button
            size="xsmall"
            className="absolute right-[5px] top-[5px]"
            type="submit"
            isLoading={isSubmitting}
          >
            Create
          </Button>
        </form>
      ) : (
        <h5 className="text-2xl font-bold tracking-tight text-gray-900 dark:text-white">
          + Create a new board
        </h5>
      )}
    </div>
  );
}

"use client";

import { useForm } from "react-hook-form";
import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import { useState } from "react";
import { useCreateColumnMutation } from "@/hooks/use-create-column-mutation";
import { Button, Input } from ".";

const createColumnSchema = z.object({
  title: z.string().min(1).max(20),
});

type CreateColumnValues = z.infer<typeof createColumnSchema>;

interface CreateColumnProps {
  boardId: string;
}

export function CreateColumn({ boardId }: CreateColumnProps) {
  const [isFormOpened, setIsFormOpened] = useState(false);

  const {
    register,
    handleSubmit,
    formState: { errors, isSubmitting },
  } = useForm<CreateColumnValues>({
    resolver: zodResolver(createColumnSchema),
  });

  const { mutateAsync } = useCreateColumnMutation({ boardId });

  const onSubmit = handleSubmit(async (values) => {
    await mutateAsync({
      ...values,
      boardId,
    });
    setIsFormOpened(false);
  });

  const openForm = () => setIsFormOpened(true);

  return (
    <div
      className="block sticky top-0 h-fit min-w-[12.5rem] w-[12.5rem] p-4 border rounded-lg shadow cursor-pointer bg-gray-800 border-gray-700 hover:bg-gray-700"
      onClick={openForm}
    >
      {isFormOpened ? (
        <form onSubmit={onSubmit} className="relative">
          <Input
            {...register("title")}
            placeholder="Enter your column title"
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
        <h5 className="text-lg font-bold tracking-tight text-gray-900 dark:text-white">
          + Create a new column
        </h5>
      )}
    </div>
  );
}

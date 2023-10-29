"use client";

import { useVerifyEmailMutation } from "@/hooks/use-verify-email-mutation";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { z } from "zod";
import { Button, Input } from ".";
import { AxiosError } from "axios";
import { useRouter } from "next/navigation";

const verifyEmailFormSchema = z.object({
  email: z.string().trim().email(),
});

type VerifyEmailFormValues = z.infer<typeof verifyEmailFormSchema>;

interface VerifyEmailFormProps {
  token: string;
}

export function VerifyEmailForm({ token }: VerifyEmailFormProps) {
  const { mutateAsync } = useVerifyEmailMutation();
  const router = useRouter();

  const {
    handleSubmit,
    register,
    formState: { errors, isSubmitting, isValid, isDirty },
    reset,
    setError,
  } = useForm<VerifyEmailFormValues>({
    defaultValues: {
      email: "",
    },
    resolver: zodResolver(verifyEmailFormSchema),
  });

  const onSubmit = handleSubmit(async (values) => {
    try {
      await mutateAsync({ token, email: values.email });
      router.replace("/");
    } catch (e) {
      reset();

      if (e instanceof AxiosError) {
        if (e.response?.data.code === "user_not_found") {
          setError("email", {
            type: "manual",
            message: "This email is not registered.",
          });
        } else if (e.response?.data.code === "token_not_found") {
          setError("root", {
            type: "manual",
            message: "This token is not valid.",
          });
        } else if (e.response?.data.code === "token_expired") {
          setError("root", {
            type: "manual",
            message: "Your token has expired. Please request a new one.",
          });
        } else {
          setError("root", {
            type: "manual",
            message: "Ooops, something went wrong. Please try again later.",
          });
        }
      } else {
        setError("root", {
          type: "manual",
          message: "Ooops, something went wrong. Please try again later.",
        });
      }
    }
  });

  return (
    <form onSubmit={onSubmit} className="block-wrapper">
      <h1 className="text-3xl text-white font-bold text-center">
        Verify your email
      </h1>
      {errors.root?.message && (
        <p className="text-center text-red-500 font-medium">
          {errors.root.message}
        </p>
      )}
      <Input
        {...register("email")}
        type="email"
        placeholder="Enter your email"
        error={errors.email?.message}
        disabled={isSubmitting}
      />
      <Button
        type="submit"
        isLoading={isSubmitting}
        disabled={!isValid || !isDirty}
      >
        Verify your email
      </Button>
    </form>
  );
}

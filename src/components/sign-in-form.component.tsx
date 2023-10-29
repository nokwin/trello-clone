"use client";

import { zodResolver } from "@hookform/resolvers/zod";
import Link from "next/link";
import { useForm } from "react-hook-form";
import { z } from "zod";
import { Button, Input } from ".";
import { useSignInMutation } from "@/hooks/use-sign-in-mutation";
import { AxiosError } from "axios";
import { useState } from "react";

const signInFormSchema = z.object({
  identifier: z.string().trim().min(3),
  password: z.string().trim().min(6),
});

type SignInFormValues = z.infer<typeof signInFormSchema>;

export function SignInForm() {
  const { mutateAsync } = useSignInMutation();

  const [showForgotPassword, setShowForgotPassword] = useState(false);

  const {
    register,
    handleSubmit,
    formState: { errors, isSubmitting, isDirty, isValid },
    setError,
  } = useForm<SignInFormValues>({
    resolver: zodResolver(signInFormSchema),
  });

  const onSubmit = handleSubmit(async (values) => {
    try {
      await mutateAsync(values);
    } catch (e) {
      if (e instanceof AxiosError) {
        if (e.response?.data.code === "invalid_credentials") {
          setError("root", {
            type: "manual",
            message: "Can't find an account with those credentials.",
          });

          setShowForgotPassword(true);
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
    <form className="block-wrapper" onSubmit={onSubmit}>
      <h1 className="text-3xl font-bold text-white text-center">
        Sign in to your account
      </h1>
      <p className="text-white text-center">
        Don't have an account?{" "}
        <Link
          href="/auth/sign-up"
          className="underline decoration-1 underline-offset-2 hover:decoration-dashed"
        >
          Sign up here
        </Link>
      </p>
      {errors.root?.message && (
        <p className="text-red-500 font-medium text-center">
          {errors.root.message}
        </p>
      )}
      <Input
        {...register("identifier")}
        placeholder="Username or email"
        type="email"
        error={errors.identifier?.message}
      />
      <Input
        {...register("password")}
        placeholder="Password"
        type="password"
        error={errors.password?.message}
      />
      <Button
        type="submit"
        isLoading={isSubmitting}
        disabled={!isValid || !isDirty}
      >
        Sign in
      </Button>
      {showForgotPassword && (
        <p className="text-white text-center">
          Forgot your password? Click{" "}
          <Link
            href="/auth/forgot-password"
            className="underline decoration-1 underline-offset-2 hover:decoration-dashed"
          >
            here
          </Link>{" "}
          to reset it.
        </p>
      )}
    </form>
  );
}

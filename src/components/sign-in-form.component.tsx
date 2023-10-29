"use client";

import { zodResolver } from "@hookform/resolvers/zod";
import Link from "next/link";
import { useForm } from "react-hook-form";
import { z } from "zod";
import { Button, Input } from ".";

const signInFormSchema = z.object({
  identifier: z.string().trim().min(3),
  password: z.string().trim().min(6),
});

type SignInFormValues = z.infer<typeof signInFormSchema>;

export function SignInForm() {
  const {
    register,
    handleSubmit,
    formState: { errors, isSubmitting, isDirty, isValid },
  } = useForm<SignInFormValues>({
    resolver: zodResolver(signInFormSchema),
  });

  return (
    <form className="block-wrapper">
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
        <p className="text-sm text-red-500 font-medium">
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
    </form>
  );
}

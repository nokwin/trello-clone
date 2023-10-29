"use client";

import { zodResolver } from "@hookform/resolvers/zod";
import Link from "next/link";
import { useForm } from "react-hook-form";
import { z } from "zod";
import { Button, Input } from ".";
import { useSignUpMutation } from "@/hooks/use-sign-up-mutation";
import { AxiosError } from "axios";
import { useRouter } from "next/navigation";

const signUpFormSchema = z
  .object({
    username: z.string().trim().min(3),
    email: z.string().trim().email(),
    password: z.string().trim().min(6),
    passwordConfirmation: z.string().trim().min(6),
  })
  .refine((data) => data.password === data.passwordConfirmation, {
    message: "Passwords do not match",
    path: ["passwordConfirmation"],
  });

type SignUpFormValues = z.infer<typeof signUpFormSchema>;

export function SignUpForm() {
  const { mutateAsync } = useSignUpMutation();
  const router = useRouter();

  const {
    register,
    handleSubmit,
    formState: { errors, isSubmitting, isValid, isDirty },
    setError,
  } = useForm<SignUpFormValues>({
    resolver: zodResolver(signUpFormSchema),
  });

  const onSubmit = handleSubmit(async (values) => {
    try {
      await mutateAsync({
        username: values.username,
        email: values.email,
        password: values.password,
      });
      router.replace(`/auth/sign-up/success?email=${values.email}`);
    } catch (e) {
      if (e instanceof AxiosError) {
        if (e.response?.data.code === "user_already_exists") {
          setError("root", {
            type: "manual",
            message: "This username or email is already taken.",
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
        Register a new account
      </h1>
      <p className="text-white text-center">
        Already have an account?{" "}
        <Link
          href="/auth/sign-in"
          className="underline decoration-1 underline-offset-2 hover:decoration-dashed"
        >
          Sign in here
        </Link>
      </p>
      {errors.root?.message && (
        <p className="text-center text-red-500 font-medium">
          {errors.root.message}
        </p>
      )}
      <Input
        {...register("username")}
        placeholder="Enter your username"
        error={errors.username?.message}
      />
      <Input
        {...register("email")}
        type="email"
        placeholder="Enter your email"
        error={errors.email?.message}
      />
      <Input
        {...register("password")}
        type="password"
        placeholder="Password"
        error={errors.password?.message}
      />
      <Input
        {...register("passwordConfirmation")}
        type="password"
        placeholder="Confirm password"
        error={errors.passwordConfirmation?.message}
      />
      <Button
        isLoading={isSubmitting}
        disabled={!isValid || !isDirty}
        type="submit"
      >
        Sign up
      </Button>
    </form>
  );
}

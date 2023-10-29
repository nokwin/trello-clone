import { SignInDto } from "@/app/api/auth/sign-in/dto";
import { api } from "@/core/api";
import { useMutation } from "@tanstack/react-query";

const signInFn = async (body: SignInDto) => {
  const { data } = await api.post("/api/auth/sign-in", body);

  return data;
};

export const useSignInMutation = () => {
  return useMutation(signInFn);
};

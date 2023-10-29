import { SignUpDto } from "@/app/api/auth/sign-up/dto";
import { api } from "@/core/api";
import { useMutation } from "@tanstack/react-query";

const signUpFn = async (body: SignUpDto) => {
  const { data } = await api.post("/api/auth/sign-up", body);

  return data;
};

export const useSignUpMutation = () => {
  const mutation = useMutation({
    mutationFn: signUpFn,
  });

  return mutation;
};

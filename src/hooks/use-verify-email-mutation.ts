import { VerifyEmailDto } from "@/app/api/auth/verify-email/dto";
import { api } from "@/core/api";
import { useMutation } from "@tanstack/react-query";

const verifyEmailFn = async (body: VerifyEmailDto) => {
  const { data } = await api.post("/api/auth/verify-email", body);

  return data;
};

export const useVerifyEmailMutation = () => {
  const mutation = useMutation({
    mutationFn: verifyEmailFn,
  });

  return mutation;
};

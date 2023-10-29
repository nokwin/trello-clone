import { ResentEmailDto } from "@/app/api/auth/resend-email/dto";
import { api } from "@/core/api";
import { useMutation } from "@tanstack/react-query";

const resendEmailFn = async (body: ResentEmailDto) => {
  const { data } = await api.post("/api/auth/resend-email", body);

  return data;
};

export const useResendEmailMutation = () => {
  const mutation = useMutation({
    mutationFn: resendEmailFn,
  });

  return mutation;
};

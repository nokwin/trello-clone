"use client";

import { useResendEmailMutation } from "@/hooks/use-resend-email-mutation";
import { Button } from ".";

interface ResendEmailProps {
  email: string;
}

export function ResendEmail({ email }: ResendEmailProps) {
  const { mutate, isLoading } = useResendEmailMutation();

  return (
    <Button onClick={() => mutate({ email })} isLoading={isLoading}>
      Resend email
    </Button>
  );
}

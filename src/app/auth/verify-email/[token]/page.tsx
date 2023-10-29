import { Button, VerifyEmailForm } from "@/components";
import { prisma } from "@/core/prisma";
import { notFound } from "next/navigation";

interface VerifyEmailProps {
  params: {
    token: string;
  };
}

export default async function VerifyEmail({ params }: VerifyEmailProps) {
  const verifyToken = await prisma.verifyEmailTokens.findUnique({
    where: {
      id: params.token,
    },
  });

  if (!verifyToken) {
    notFound();
  }

  if (verifyToken.expires < new Date()) {
    notFound();
  }

  return (
    <div className="h-content flex-center">
      <VerifyEmailForm token={params.token} />
    </div>
  );
}

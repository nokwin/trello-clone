import { NextResponse } from "next/server";
import { resentEmailDto } from "./dto";
import { prisma } from "@/core/prisma";
import { sendVerifyEmail } from "@/utils/emails";

export async function POST(req: Request) {
  const bodyRaw = await req.json();
  const validateBody = resentEmailDto.safeParse(bodyRaw);

  if (!validateBody.success) {
    return NextResponse.json(validateBody.error.issues, {
      status: 400,
    });
  }

  const user = await prisma.users.findUnique({
    where: {
      email: validateBody.data.email,
    },
  });

  if (!user) {
    return NextResponse.json(
      {
        code: "user_not_found",
        message: "User not found",
      },
      {
        status: 400,
      }
    );
  }

  if (user.isEmailVerified) {
    return NextResponse.json(
      {
        code: "user_already_verified",
        message: "User already verified",
      },
      {
        status: 400,
      }
    );
  }

  let verifyEmailToken = await prisma.verifyEmailTokens.findFirst({
    where: {
      userId: user.id,
      expires: {
        gt: new Date(),
      },
    },
  });

  if (!verifyEmailToken) {
    verifyEmailToken = await prisma.verifyEmailTokens.create({
      data: {
        userId: user.id,
        expires: new Date(Date.now() + 1000 * 60 * 60 * 24),
      },
    });
  }

  await sendVerifyEmail(user.email, verifyEmailToken.id);

  return NextResponse.json({});
}

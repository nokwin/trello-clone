import { NextResponse } from "next/server";
import { verifyEmailDto } from "./dto";
import { prisma } from "@/core/prisma";

export async function POST(req: Request) {
  const bodyRaw = await req.json();
  const validateBody = verifyEmailDto.safeParse(bodyRaw);

  if (!validateBody.success) {
    return NextResponse.json(validateBody.error.issues, {
      status: 400,
    });
  }

  const { email, token } = validateBody.data;

  const user = await prisma.users.findUnique({
    where: {
      email,
    },
  });

  if (!user) {
    return NextResponse.json(
      {
        code: "user_not_found",
        message: "User not found",
      },
      {
        status: 404,
      }
    );
  }

  const verifyToken = await prisma.verifyEmailTokens.findUnique({
    where: {
      id: token,
    },
  });

  if (!verifyToken) {
    return NextResponse.json(
      {
        code: "token_not_found",
        message: "Token not found",
      },
      {
        status: 404,
      }
    );
  }

  if (verifyToken.expires < new Date()) {
    return NextResponse.json(
      {
        code: "token_expired",
        message: "Token expired",
      },
      {
        status: 400,
      }
    );
  }

  const verifiedUser = await prisma.users.update({
    where: {
      id: user.id,
    },
    data: {
      isEmailVerified: true,
    },
  });

  await prisma.verifyEmailTokens.delete({
    where: {
      id: token,
    },
  });

  return NextResponse.json(verifiedUser);
}

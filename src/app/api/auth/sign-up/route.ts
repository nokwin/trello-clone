import bcrypt from "bcrypt";
import { NextResponse } from "next/server";
import { signUpDto } from "./dto";
import { prisma } from "@/core/prisma";
import { AuthProvider } from "@prisma/client";
import { config } from "@/core/config";
import { mailTransport } from "@/core/nodemailer";
import { sendVerifyEmail } from "@/utils/emails";

export async function POST(req: Request) {
  const bodyRaw = await req.json();
  const validateBody = signUpDto.safeParse(bodyRaw);

  if (!validateBody.success) {
    return NextResponse.json(validateBody.error.issues, {
      status: 400,
    });
  }

  const { email, password, username } = validateBody.data;

  const existingUser = await prisma.users.findFirst({
    where: {
      OR: [
        {
          email,
        },
        {
          username,
        },
      ],
    },
  });

  if (existingUser) {
    return NextResponse.json(
      {
        code: "user_already_exists",
        message: "User already exists",
      },
      {
        status: 400,
      }
    );
  }

  const user = await prisma.users.create({
    data: {
      email,
      username,
    },
  });

  const saltRounds = 10;
  const accessToken = await bcrypt.hash(password, saltRounds);

  await prisma.credentials.create({
    data: {
      accessToken,
      userId: user.id,
      provider: AuthProvider.EMAIL,
    },
  });

  const verifyEmailToken = await prisma.verifyEmailTokens.create({
    data: {
      userId: user.id,
      expires: new Date(Date.now() + 1000 * 60 * 60 * 24),
    },
  });

  await sendVerifyEmail(email, verifyEmailToken.id);

  return NextResponse.json(user);
}

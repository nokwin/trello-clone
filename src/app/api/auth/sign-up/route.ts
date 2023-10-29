import bcrypt from "bcrypt";
import { NextResponse } from "next/server";
import { signUpDto } from "./dto";
import { prisma } from "@/core/prisma";
import { AuthProvider } from "@prisma/client";
import { config } from "@/core/config";
import { mailTransport } from "@/core/nodemailer";

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

  const test = await mailTransport.sendMail({
    from: config.mail.from,
    to: user.email,
    subject: "Verify your email",
    html: `Please, verify your email <a href="${config.baseApiUri}/auth/verify-email/${verifyEmailToken.id}">here</a>`,
    text: `Please, verify your email here: ${config.baseApiUri}/auth/verify-email/${verifyEmailToken.id}`,
  });

  return NextResponse.json(user);
}

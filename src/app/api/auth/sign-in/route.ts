import bcrypt from "bcrypt";
import { NextResponse } from "next/server";
import { signInDto } from "./dto";
import { prisma } from "@/core/prisma";

export async function POST(req: Request) {
  const bodyRaw = await req.json();
  const validateBody = await signInDto.safeParse(bodyRaw);

  if (!validateBody.success) {
    return NextResponse.json(validateBody.error.issues, {
      status: 400,
    });
  }

  const { identifier, password } = validateBody.data;

  const user = await prisma.users.findFirst({
    where: {
      OR: [
        {
          email: identifier,
        },
        {
          username: identifier,
        },
      ],
    },
    include: {
      credentials: true,
    },
  });

  if (!user) {
    return NextResponse.json(
      {
        code: "invalid_credentials",
        message: "Invalid credentials",
      },
      {
        status: 400,
      }
    );
  }

  const passwordCredentials = user.credentials.find(
    (credential) => credential.provider === "EMAIL"
  );

  if (!passwordCredentials) {
    return NextResponse.json(
      {
        code: "invalid_credentials",
        message: "Invalid credentials",
      },
      {
        status: 400,
      }
    );
  }

  const passwordMatch = await bcrypt.compare(
    password,
    passwordCredentials.accessToken
  );

  if (!passwordMatch) {
    return NextResponse.json(
      {
        code: "invalid_credentials",
        message: "Invalid credentials",
      },
      {
        status: 400,
      }
    );
  }

  return NextResponse.json({});
}

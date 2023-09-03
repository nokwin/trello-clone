import { NextResponse } from "next/server";
import { createBoardDto } from "./dto";
import { prisma } from "@/core/prisma";

export async function GET(req: Request) {
  const boards = await prisma.boards.findMany();

  return NextResponse.json(boards);
}

export async function POST(req: Request) {
  const bodyRaw = await req.json();
  const validateBody = createBoardDto.safeParse(bodyRaw);

  if (!validateBody.success) {
    return NextResponse.json(validateBody.error.issues, {
      status: 400,
    });
  }

  const { title } = validateBody.data;

  const newBoard = await prisma.boards.create({
    data: {
      title,
    },
  });

  return NextResponse.json(newBoard);
}

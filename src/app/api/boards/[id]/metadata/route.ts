import { prisma } from "@/core/prisma";
import { BoardRouteContext } from "../route";
import { NextResponse } from "next/server";

export async function GET(req: Request, { params }: BoardRouteContext) {
  const { id } = params;

  const board = await prisma.boards.findUnique({
    where: {
      id,
    },
  });

  if (!board) {
    return NextResponse.json([
      {
        code: "not_found",
        messages: "Board not found",
      },
    ]);
  }

  return NextResponse.json(board);
}

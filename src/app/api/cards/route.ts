import { NextResponse } from "next/server";
import { createCardDto } from "./dto";
import { prisma } from "@/core/prisma";

export async function POST(req: Request) {
  const bodyRaw = await req.json();
  const validateBody = createCardDto.safeParse(bodyRaw);

  if (!validateBody.success) {
    return NextResponse.json(validateBody.error.issues, { status: 400 });
  }

  const lastCard = await prisma.cards.findFirst({
    where: {
      columnId: validateBody.data.columnId,
    },
    orderBy: {
      order: "desc",
    },
  });

  const newCard = await prisma.cards.create({
    data: {
      ...validateBody.data,
      order: lastCard ? lastCard.order + 1 : 0,
    },
  });

  return NextResponse.json(newCard);
}

export async function GET(req: Request) {
  const { searchParams } = new URL(req.url);
  const columnId = searchParams.get("columnId");

  if (!columnId) {
    return NextResponse.json(
      [
        {
          code: "missing_query_param",
          field: "columnId",
          message: "Query param columndId is required",
        },
      ],
      { status: 400 }
    );
  }

  const cards = await prisma.cards.findMany({
    where: {
      columnId,
    },
    orderBy: {
      order: "asc",
    },
  });

  return NextResponse.json(cards);
}

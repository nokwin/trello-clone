import { NextResponse } from "next/server";
import { updateColumnsOrderDto } from "../dto";
import { prisma } from "@/core/prisma";

export async function PATCH(req: Request) {
  const bodyRaw = await req.json();
  const validateBody = updateColumnsOrderDto.safeParse(bodyRaw);

  if (!validateBody.success) {
    return NextResponse.json(validateBody.error.issues, { status: 400 });
  }

  const queries = validateBody.data.map(({ id, order }) =>
    prisma.columns.update({
      where: {
        id,
      },
      data: {
        order,
      },
    })
  );

  await prisma.$transaction(queries);

  return NextResponse.json({}, { status: 200 });
}

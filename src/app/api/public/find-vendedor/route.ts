import { NextRequest, NextResponse } from "next/server";
import { prisma } from "@/lib/prisma";

export async function GET(req: NextRequest) {
  const { searchParams } = new URL(req.url);
  const nome = searchParams.get("nome");

  if (!nome) {
    return NextResponse.json({ error: "Nome obrigatório" }, { status: 400 });
  }

  const vendedor = await prisma.user.findFirst({
    where: {
      nome: {
        contains: nome,
      },
    },
  });

  if (!vendedor) {
    return NextResponse.json({ error: "Vendedor não encontrado" }, { status: 404 });
  }

  return NextResponse.json(vendedor);
}

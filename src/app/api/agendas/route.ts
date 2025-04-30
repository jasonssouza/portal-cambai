import { prisma } from "@/lib/prisma";
import { NextRequest, NextResponse } from "next/server";
import { getToken } from "next-auth/jwt";

const secret = process.env.NEXTAUTH_SECRET;

export async function GET(req: NextRequest) {
  const token = await getToken({ req, secret });
  if (!token?.email) {
    return NextResponse.json({ message: "Não autenticado" }, { status: 401 });
  }

  const agendas = await prisma.agenda.findMany({
    where: {
      user: {
        email: token.email,
      },
    },
  });

  return NextResponse.json(agendas);
}

export async function POST(req: NextRequest) {
  const token = await getToken({ req, secret });
  if (!token?.email) {
    return NextResponse.json({ message: "Não autenticado" }, { status: 401 });
  }

  const body = await req.json();
  const { data, descricao } = body;

  const user = await prisma.user.findUnique({
    where: { email: token.email },
  });

  if (!user) {
    return NextResponse.json({ message: "Usuário não encontrado" }, { status: 404 });
  }
  
  const novaAgenda = await prisma.agenda.create({
    data: {
      data: new Date(data),
      descricao,
      userId: user!.id,
    },
  });

  return NextResponse.json(novaAgenda);
}

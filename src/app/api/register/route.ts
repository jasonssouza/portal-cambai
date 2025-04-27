import { prisma } from "@/lib/prisma";
import { NextRequest, NextResponse } from "next/server";

export async function POST(req: NextRequest) {
  const { nome, email, senha } = await req.json();

  // Validação simples
  if (!nome || !email || !senha) {
    return NextResponse.json({ message: "Campos obrigatórios!" }, { status: 400 });
  }

  // Verifica se já existe
  const usuarioExistente = await prisma.user.findUnique({
    where: { email },
  });

  if (usuarioExistente) {
    return NextResponse.json({ message: "E-mail já cadastrado!" }, { status: 400 });
  }

  // Criar usuário
  const novoUsuario = await prisma.user.create({
    data: {
      nome,
      email,
      // armazenar a senha simples para agora ( criptografia com bcrypt)
    },
  });

  return NextResponse.json(novoUsuario);
}

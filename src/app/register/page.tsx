"use client";

import { useState } from "react";
import axios from "axios";
import { useRouter } from "next/navigation";

export default function RegisterPage() {
  const [nome, setNome] = useState("");
  const [email, setEmail] = useState("");
  const [senha, setSenha] = useState("");
  const router = useRouter();

  const handleRegister = async (e: React.FormEvent) => {
    e.preventDefault();
    await axios.post("/api/register", {
      nome,
      email,
      senha,
    });
    router.push("/login");
  };

  return (
    <div className="flex min-h-screen flex-col items-center justify-center bg-black text-white p-4">
      <h1 className="text-3xl font-bold mb-6">Cadastro - Portal Cambaí</h1>

      <form onSubmit={handleRegister} className="flex flex-col gap-4 w-full max-w-sm">
        <input
          type="text"
          placeholder="Seu Nome"
          value={nome}
          onChange={(e) => setNome(e.target.value)}
          required
          className="p-2 rounded border text-white bg-zinc-900 placeholder-gray-400"
        />
        <input
          type="email"
          placeholder="Seu E-mail"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          required
          className="p-2 rounded border text-white bg-zinc-900 placeholder-gray-400"
        />
        <input
          type="password"
          placeholder="Sua Senha"
          value={senha}
          onChange={(e) => setSenha(e.target.value)}
          required
          className="p-2 rounded border text-white bg-zinc-900 placeholder-gray-400"
        />
        <button type="submit" className="bg-green-600 hover:bg-green-700 text-white py-2 rounded">
          Criar Conta
        </button>
      </form>
    </div>
  );
}

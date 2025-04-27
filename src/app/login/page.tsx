"use client";

import { signIn } from "next-auth/react";
import { useState } from "react";
import { useRouter } from "next/navigation";

export default function LoginPage() {
  const [email, setEmail] = useState("");
  const [senha, setSenha] = useState("");
  const router = useRouter();

  const handleLogin = async (e: React.FormEvent) => {
    e.preventDefault();
    await signIn("credentials", {
      email,
      password: senha,
      callbackUrl: "/dashboard",
    });
  };

  return (
    <div className="flex min-h-screen flex-col items-center justify-center bg-black text-white p-4">
      <h1 className="text-3xl font-bold mb-6">Login - Portal Cambaí</h1>

      <form onSubmit={handleLogin} className="flex flex-col gap-4 w-full max-w-sm">
        <input
          type="email"
          placeholder="Seu E-mail"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          required
          className="p-2 rounded border text-black"
        />

        <input
          type="password"
          placeholder="Sua Senha"
          value={senha}
          onChange={(e) => setSenha(e.target.value)}
          required
          className="p-2 rounded border text-black"
        />

        <button type="submit" className="bg-green-600 hover:bg-green-700 text-white py-2 rounded">
          Entrar
        </button>
      </form>

      <div className="flex flex-col items-center gap-4 mt-6">
        <button
          onClick={() => signIn("google")}
          className="bg-blue-600 hover:bg-blue-700 text-white py-2 px-4 rounded"
        >
          Entrar com Google
        </button>

        <button
          onClick={() => router.push("/register")}
          className="underline hover:text-gray-400 text-sm"
        >
          Ainda não tem conta? Cadastre-se
        </button>
      </div>
    </div>
  );
}

"use client";

import { useSession } from "next-auth/react";
import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";
import axios from "axios";
import { useState } from "react";

interface Produto {
  id: number;
  nome: string;
  descricao: string;
  preco: number;
}

interface Agenda {
  id: number;
  data: string;
  descricao: string;
}

export default function DashboardPage() {
  const { data: session } = useSession();
  const queryClient = useQueryClient();

  const [nome, setNome] = useState("");
  const [descricaoProduto, setDescricaoProduto] = useState("");
  const [preco, setPreco] = useState<number>(0);

  const [dataAgenda, setDataAgenda] = useState("");
  const [descricaoAgenda, setDescricaoAgenda] = useState("");

  // Produtos
  const { data: produtos = [], isLoading: loadingProdutos } = useQuery<Produto[]>({
    queryKey: ["produtos"],
    queryFn: async () => {
      const res = await axios.get("/api/produtos");
      return res.data;
    },
  });

  const criarProduto = useMutation({
    mutationFn: async () => {
      await axios.post("/api/produtos", {
        nome,
        descricao: descricaoProduto,
        preco,
      });
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["produtos"] });
      setNome("");
      setDescricaoProduto("");
      setPreco(0);
    },
  });

  // Agendas
  const { data: agendas = [], isLoading: loadingAgendas } = useQuery<Agenda[]>({
    queryKey: ["agendas"],
    queryFn: async () => {
      const res = await axios.get("/api/agendas");
      return res.data;
    },
  });

  const criarAgenda = useMutation({
    mutationFn: async () => {
      await axios.post("/api/agendas", {
        data: dataAgenda,
        descricao: descricaoAgenda,
      });
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["agendas"] });
      setDataAgenda("");
      setDescricaoAgenda("");
    },
  });

  if (!session) {
    return (
      <div className="flex items-center justify-center min-h-screen">
        <p>Carregando...</p>
      </div>
    );
  }

  return (
    <div className="flex flex-col items-center justify-center min-h-screen p-4 space-y-10">
      <h1 className="text-3xl font-bold mb-8">Portal Cambaí - Dashboard</h1>

      {/* Formulário de Produto */}
      <form
        onSubmit={(e) => {
          e.preventDefault();
          criarProduto.mutate();
        }}
        className="flex flex-col gap-4 w-full max-w-md mb-10"
      >
        <h2 className="text-2xl font-semibold">Cadastrar Produto</h2>
        <input
          type="text"
          placeholder="Nome do Produto"
          value={nome}
          onChange={(e) => setNome(e.target.value)}
          className="p-2 border rounded"
          required
        />
        <textarea
          placeholder="Descrição"
          value={descricaoProduto}
          onChange={(e) => setDescricaoProduto(e.target.value)}
          className="p-2 border rounded"
        />
        <input
          type="number"
          placeholder="Preço"
          value={preco}
          onChange={(e) => setPreco(Number(e.target.value))}
          className="p-2 border rounded"
          step="0.01"
        />
        <button
          type="submit"
          className="bg-green-600 text-white py-2 rounded hover:bg-green-700"
        >
          Cadastrar Produto
        </button>
      </form>

      {/* Listagem de Produtos */}
      <div className="w-full max-w-md space-y-4">
        <h2 className="text-2xl font-semibold mb-2">Produtos Cadastrados</h2>
        {loadingProdutos ? (
          <p>Carregando produtos...</p>
        ) : (
          produtos.map((produto) => (
            <div key={produto.id} className="border p-4 rounded shadow">
              <h2 className="text-xl font-bold">{produto.nome}</h2>
              <p>{produto.descricao}</p>
              <p className="text-green-600 font-semibold">R$ {produto.preco.toFixed(2)}</p>
            </div>
          ))
        )}
      </div>

      {/* Formulário de Agenda */}
      <form
        onSubmit={(e) => {
          e.preventDefault();
          criarAgenda.mutate();
        }}
        className="flex flex-col gap-4 w-full max-w-md mb-10"
      >
        <h2 className="text-2xl font-semibold">Cadastrar Agenda</h2>
        <input
          type="datetime-local"
          value={dataAgenda}
          onChange={(e) => setDataAgenda(e.target.value)}
          className="p-2 border rounded"
          required
        />
        <textarea
          placeholder="Descrição da Agenda"
          value={descricaoAgenda}
          onChange={(e) => setDescricaoAgenda(e.target.value)}
          className="p-2 border rounded"
        />
        <button
          type="submit"
          className="bg-blue-600 text-white py-2 rounded hover:bg-blue-700"
        >
          Cadastrar Agenda
        </button>
      </form>

      {/* Listagem de Agendas */}
      <div className="w-full max-w-md space-y-4">
        <h2 className="text-2xl font-semibold mb-2">Agendas Cadastradas</h2>
        {loadingAgendas ? (
          <p>Carregando agendas...</p>
        ) : (
          agendas.map((agenda) => (
            <div key={agenda.id} className="border p-4 rounded shadow">
              <p><strong>Data:</strong> {new Date(agenda.data).toLocaleString()}</p>
              <p><strong>Descrição:</strong> {agenda.descricao}</p>
            </div>
          ))
        )}
      </div>
    </div>
  );
}

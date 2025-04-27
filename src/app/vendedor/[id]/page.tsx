import { prisma } from "@/lib/prisma";

interface VendedorPageProps {
  params: {
    id: string;
  };
}

export default async function VendedorPage({ params }: { params: { id: string } }) {
  const vendedor = await prisma.user.findUnique({
    where: {
      id: Number(params.id),
    },
    include: {
      produtos: true,
      agendas: true,
    },
  });

  if (!vendedor) {
    return (
      <div className="flex min-h-screen items-center justify-center">
        <p>Vendedor não encontrado.</p>
      </div>
    );
  }

  return (
    <div className="flex flex-col items-center justify-center min-h-screen p-4">
      <h1 className="text-3xl font-bold mb-6">Perfil do Vendedor</h1>

      <div className="mb-10 text-center">
        <h2 className="text-2xl">{vendedor.nome}</h2>
        <p className="text-gray-500">{vendedor.email}</p>
      </div>

      <div className="w-full max-w-md space-y-4 mb-10">
        <h2 className="text-xl font-semibold mb-2">Produtos</h2>
        {vendedor.produtos.length > 0 ? (
          vendedor.produtos.map((produto) => (
            <div key={produto.id} className="border p-4 rounded shadow">
              <h3 className="text-lg font-bold">{produto.nome}</h3>
              <p>{produto.descricao}</p>
              <p className="text-green-600 font-semibold">R$ {produto.preco.toFixed(2)}</p>
            </div>
          ))
        ) : (
          <p>Nenhum produto cadastrado.</p>
        )}
      </div>

      <div className="w-full max-w-md space-y-4">
        <h2 className="text-xl font-semibold mb-2">Agenda Disponível</h2>
        {vendedor.agendas.length > 0 ? (
          vendedor.agendas.map((agenda) => (
            <div key={agenda.id} className="border p-4 rounded shadow">
              <p><strong>Data:</strong> {new Date(agenda.data).toLocaleString()}</p>
              <p><strong>Descrição:</strong> {agenda.descricao}</p>
            </div>
          ))
        ) : (
          <p>Nenhuma agenda cadastrada.</p>
        )}
      </div>
    </div>
  );
}

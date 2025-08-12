import { ClientSchema, type Client } from '../types';

interface VendaRaw {
  data: string;
  valor: number;
}

interface ClienteRaw {
  info?: {
    nomeCompleto?: string;
    detalhes?: {
      email?: string;
      nascimento?: string;
    };
  };
  duplicado?: {
    nomeCompleto?: string;
  };
  estatisticas?: {
    vendas?: VendaRaw[];
  };
}

interface ApiResponse {
  data?: {
    clientes?: ClienteRaw[];
  };
}

export function parseClientsResponse(payload: unknown): Client[] {
  const raw = (payload as ApiResponse)?.data?.clientes ?? [];
  const result: Client[] = [];
  const seen = new Set<string>();

  for (const node of raw) {
    const info = node?.info ?? {};
    const detalhes = info?.detalhes ?? {};
    const nome = String(info?.nomeCompleto ?? node?.duplicado?.nomeCompleto ?? '').trim();
    const email = String(detalhes?.email ?? '').trim();
    const nascimento = String(detalhes?.nascimento ?? '').trim();

    const vendas = Array.isArray(node?.estatisticas?.vendas)
      ? node.estatisticas!.vendas!.map((v) => ({
        data: String(v.data),
        valor: Number(v.valor) || 0,
      }))
      : [];

    const key = `${nome}__${email || 'noemail'}`;
    if (!nome || seen.has(key)) continue;
    seen.add(key);

    result.push(ClientSchema.parse({ id: btoa(key), nome, email, nascimento, vendas }));
  }

  return result;
}

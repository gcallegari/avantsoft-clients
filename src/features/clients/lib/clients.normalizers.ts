import { ClientSchema, type Client } from '../types';

type VendaRaw = { data: string; valor: number };

export function parseClientsResponse(payload: unknown): Client[] {
  const raw = (payload as any)?.data?.clientes ?? [];
  const result: Client[] = [];
  const seen = new Set<string>();

  for (const node of raw) {
    const info = node?.info ?? {};
    const detalhes = info?.detalhes ?? {};
    const name = String(info?.nomeCompleto ?? node?.duplicado?.nomeCompleto ?? '').trim();
    const email = String(detalhes?.email ?? '').trim();
    const birthdate = String(detalhes?.nascimento ?? '').trim();

    const sales = Array.isArray(node?.estatisticas?.vendas)
      ? (node.estatisticas.vendas as VendaRaw[]).map((v) => ({
          data: String(v.data),
          value: Number(v.valor) || 0,
        }))
      : [];

    const key = `${name}__${email || 'noemail'}`;
    if (!name || seen.has(key)) continue;
    seen.add(key);

    result.push(ClientSchema.parse({ id: btoa(key), name, email, birthdate, sales }));
  }
  return result;
}

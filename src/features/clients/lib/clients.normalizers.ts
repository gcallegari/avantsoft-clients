import { ClientSchema, type Client } from '../types';

interface VendaRaw {
  data: string;
  value: number;
}

interface ClienteRaw {
  info?: {
    name?: string;
    details?: {
      email?: string;
      birthdate?: string;
    };
  };
  duplicated?: {
    name?: string;
  };
  statistics?: {
    sales?: VendaRaw[];
  };
}

interface ApiResponse {
  data?: {
    clients?: ClienteRaw[];
  };
}

function parseClientsResponse(payload: unknown): Client[] {
  const raw = (payload as ApiResponse)?.data?.clients ?? [];
  const result: Client[] = [];
  const seen = new Set<string>();

  for (const node of raw) {
    const info = node?.info ?? {};
    const details = info?.details ?? {};
    const name = String(info?.name ?? node?.duplicated?.name ?? '').trim();
    const email = String(details?.email ?? '').trim();
    const birthdate = String(details?.birthdate ?? '').trim();

    const sales = Array.isArray(node?.statistics?.sales)
      ? node.statistics!.sales!.map((v) => ({
        data: String(v.data),
        valor: Number(v.value) || 0,
      }))
      : [];

    const key = `${name}__${email || 'noemail'}`;
    if (!name || seen.has(key)) continue;
    seen.add(key);

    result.push(ClientSchema.parse({ id: btoa(key), name, email, birthdate, sales }));
  }

  return result;
}

export { parseClientsResponse };

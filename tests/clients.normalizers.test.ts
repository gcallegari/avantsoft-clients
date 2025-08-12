import { describe, expect, it } from 'vitest';
import { parseClientsResponse } from '../src/features/clients/lib/clients.normalizers.ts';

const payload = {
  data: {
    clientes: [
      {
        info: {
          nomeCompleto: 'Ana Beatriz',
          detalhes: { email: 'ana.b@example.com', nascimento: '1992-05-01' },
        },
        estatisticas: {
          vendas: [
            { data: '2024-01-01', valor: 150 },
            { data: '2024-01-02', valor: 50 },
          ],
        },
      },
      {
        info: {
          nomeCompleto: 'Carlos Eduardo',
          detalhes: { email: 'cadu@example.com', nascimento: '1987-08-15' },
        },
        duplicado: { nomeCompleto: 'Carlos Eduardo' },
        estatisticas: { vendas: [] },
      },
    ],
  },
  meta: { registroTotal: 2, pagina: 1 },
  redundante: { status: 'ok' },
};

describe('parseClientsResponse', () => {
  it('normalizes and deduplicates clients', () => {
    const result = parseClientsResponse(payload);
    expect(result).toHaveLength(2);
    const ana = result.find((c) => c.nome === 'Ana Beatriz')!;
    expect(ana.email).toBe('ana.b@example.com');
    expect(ana.vendas.reduce((s, v) => s + v.valor, 0)).toBe(200);
  });
});

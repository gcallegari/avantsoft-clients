import type { Client } from '@/features/clients/types';
import { firstMissingLetter } from '@/shared/lib/strings';
import { memo, useMemo, useState } from 'react';
import styled from 'styled-components';
import { useClients } from '../../../../hooks/useClients';
import { AddClientDialog } from '../AddClientDialog';
import { SalesAreaChart } from '../SalesChart';

const Layout = styled.main`
  width: 100%;
  max-width: 1200px;
  margin: 24px auto;
  padding: 0 16px;
  display: grid;
  gap: 16px;
`;
const Toolbar = styled.div`
  display: flex;
  align-items: center;
  justify-content: space-between;
  gap: 12px;
  flex-wrap: wrap;
`;
const HStack = styled.div`
  display: flex;
  gap: 8px;
  align-items: center;
  flex-wrap: wrap;
`;
const Button = styled.button`
  background: var(--brand);
  color: white;
  border: none;
  padding: 10px 12px;
  border-radius: 10px;
  cursor: pointer;
  font-weight: 600;
  &:hover {
    filter: brightness(1.05);
  }
`;
const Card = styled.section`
  background: var(--card);
  border: 1px solid #1f2937;
  border-radius: 16px;
  box-shadow: var(--shadow);
`;
const CardHead = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding: 14px 16px;
  border-bottom: 1px solid #1f2937;
`;
const CardBody = styled.div`
  padding: 16px;
`;
const Table = styled.table`
  width: 100%;
  border-collapse: separate;
  border-spacing: 0;
  thead th {
    position: sticky;
    top: 0;
    background: #0b1222;
    z-index: 1;
  }
  th,
  td {
    text-align: left;
    padding: 12px 14px;
    border-bottom: 1px solid #1f2937;
  }
  tbody tr:hover {
    background: #0b1222;
  }
`;
const Badge = styled.span<{ variant?: 'ok' | 'warn' | 'danger' | 'brand' }>`
  display: inline-flex;
  align-items: center;
  gap: 6px;
  padding: 4px 8px;
  border-radius: 999px;
  font-size: 12px;
  border: 1px solid #334155;
  background: ${({ variant }) => (variant ? `var(--${variant})` : '#111827')};
  color: ${({ variant }) => (variant ? '#0b1222' : 'var(--text)')};
`;
const Missing = styled.span`
  display: inline-flex;
  justify-content: center;
  align-items: center;
  width: 26px;
  height: 26px;
  border-radius: 999px;
  border: 1px solid #334155;
  font-weight: 700;
  background: #0b1222;
`;
const Input = styled.input`
  background: #0b1222;
  color: var(--text);
  border: 1px solid #334155;
  padding: 10px 12px;
  border-radius: 10px;
  &:focus {
    outline: none;
    border-color: var(--brand);
  }
`;

export function ClientsPage() {
  const { list, loading, error, addClient, salesByDay, leaders } = useClients();
  const [search, setSearch] = useState('');
  const [showAdd, setShowAdd] = useState(false);

  const filtered = useMemo(
    () =>
      list.filter(
        (c) =>
          c.nome.toLowerCase().includes(search.toLowerCase()) ||
          c.email.toLowerCase().includes(search.toLowerCase())
      ),
    [list, search]
  );

  return (
    <Layout>
      <Toolbar>
        <HStack>
          <Input
            aria-label="Buscar"
            placeholder="Buscar por nome ou e-mail"
            value={search}
            onChange={(e) => setSearch(e.target.value)}
          />
          <Button onClick={() => setShowAdd(true)}>+ Adicionar cliente</Button>
        </HStack>
        <HStack>
          {leaders.topVolume && <Badge variant="brand">Maior volume</Badge>}
          {leaders.topAverage && <Badge variant="ok">Maior média</Badge>}
          {leaders.topFrequency && <Badge variant="warn">Maior frequência</Badge>}
        </HStack>
      </Toolbar>

      <Card>
        <CardHead>
          <strong>Vendas por dia</strong>
        </CardHead>
        <CardBody>
          <SalesAreaChart data={salesByDay} />
        </CardBody>
      </Card>

      <Card>
        <CardHead>
          <strong>Clientes</strong>
        </CardHead>
        <CardBody>
          {loading && <p>Carregando...</p>}
          {error && <p style={{ color: 'var(--danger)' }}>{error}</p>}
          {!loading && !error && <ClientsTable rows={filtered} leaders={leaders} />}
        </CardBody>
      </Card>

      {showAdd && (
        <AddClientDialog
          onClose={() => setShowAdd(false)}
          onSubmit={(c) => {
            addClient(c);
            setShowAdd(false);
          }}
        />
      )}
    </Layout>
  );
}

const Tr = memo(function Tr({
  c,
  leaders,
}: {
  c: Client;
  leaders: {
    topVolume?: { id: string };
    topAverage?: { id: string };
    topFrequency?: { id: string };
  };
}) {
  const qtd = c.vendas.length;
  const total = c.vendas.reduce((s, v) => s + v.valor, 0);
  const avg = qtd ? total / qtd : 0;
  const missing = firstMissingLetter(c.nome);
  const isTopVolume = leaders.topVolume?.id === c.id;
  const isTopAverage = leaders.topAverage?.id === c.id;
  const isTopFrequency = leaders.topFrequency?.id === c.id;
  return (
    <tr
      style={{
        outline:
          isTopVolume || isTopAverage || isTopFrequency ? '2px solid var(--brand)' : undefined,
      }}
    >
      <td>
        <Missing title="Primeira letra do alfabeto que NÃO aparece no nome">{missing}</Missing>
      </td>
      <td>
        {c.nome} {isTopVolume && <Badge variant="brand">Top volume</Badge>}{' '}
        {isTopAverage && <Badge variant="ok">Top média</Badge>}{' '}
        {isTopFrequency && <Badge variant="warn">Top frequência</Badge>}
      </td>
      <td>{c.email || '—'}</td>
      <td>{c.nascimento || '—'}</td>
      <td>{qtd}</td>
      <td>R$ {total.toFixed(2)}</td>
      <td>R$ {avg.toFixed(2)}</td>
    </tr>
  );
});

function ClientsTable({
  rows,
  leaders,
}: {
  rows: Client[];
  leaders: {
    topVolume?: { id: string };
    topAverage?: { id: string };
    topFrequency?: { id: string };
  };
}) {
  return (
    <Table role="table">
      <caption className="sr-only">Clientes e estatísticas</caption>
      <thead>
        <tr>
          <th scope="col">Indicador</th>
          <th scope="col">Nome</th>
          <th scope="col">Email</th>
          <th scope="col">Nascimento</th>
          <th scope="col">Vendas (qtd)</th>
          <th scope="col">Total vendido</th>
          <th scope="col">Média por venda</th>
        </tr>
      </thead>
      <tbody>
        {rows.map((c) => (
          <Tr key={c.id} c={c} leaders={leaders} />
        ))}
      </tbody>
    </Table>
  );
}

import { useCallback, useDeferredValue, useMemo, useState } from 'react';
import { useClients } from '../../../../hooks/useClients';
import { AddClientDialog } from '../AddClientDialog';
import { SalesAreaChart } from '../SalesChart';
import {
  Button,
  Card,
  CardBody,
  CardHead,
  HStack,
  Input,
  Layout,
  Toolbar,
} from './clientsPage.styles';
import { normalizeText } from './clientsPage.types';
import { ClientsTable } from './components/ClientsTable';
import { Badge } from './components/Tr/tr.styles';

export function ClientsPage() {
  const { list, loading, error, addClient, salesByDay, leaders } = useClients();
  const [search, setSearch] = useState('');
  const [sortBy, setSortBy] = useState<'name' | 'total' | 'freq'>('name');
  const [showAdd, setShowAdd] = useState(false);

  const deferredSearch = useDeferredValue(search);
  const searchNorm = normalizeText(deferredSearch);

  const openAdd = useCallback(() => setShowAdd(true), []);
  const closeAdd = useCallback(() => setShowAdd(false), []);

  const processed = useMemo(() => {
    const filtered = list.filter((c) => {
      if (!searchNorm) return true;
      const name = normalizeText(c.name);
      const email = normalizeText(c.email);
      return name.includes(searchNorm) || email.includes(searchNorm);
    });

    if (sortBy === 'name') {
      return [...filtered].sort((a, b) => a.name.localeCompare(b.name, 'pt-BR'));
    }
    if (sortBy === 'total') {
      return [...filtered].sort((a, b) => {
        const ta = a.sales.reduce((s, v) => s + v.value, 0);
        const tb = b.sales.reduce((s, v) => s + v.value, 0);
        return tb - ta;
      });
    }

    return [...filtered].sort((a, b) => b.sales.length - a.sales.length);
  }, [list, searchNorm, sortBy]);

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
          <Button onClick={openAdd}>+ Adicionar cliente</Button>
        </HStack>
        <HStack>
          <label style={{ color: 'var(--muted)' }}>
            Ordenar por:{' '}
            <select
              value={sortBy}
              onChange={(e) => setSortBy(e.target.value as typeof sortBy)}
              aria-label="Ordenar por"
            >
              <option value="name">Nome</option>
              <option value="total">Total vendido</option>
              <option value="freq">Frequência</option>
            </select>
          </label>
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

      <Card aria-live="polite">
        <CardHead>
          <strong>Clientes</strong>
        </CardHead>
        <CardBody>
          {loading && <p>Carregando...</p>}
          {error && (
            <div>
              <p style={{ color: 'var(--danger)' }}>{error}</p>
              <Button onClick={() => location.reload()}>Tentar novamente</Button>
            </div>
          )}
          {!loading && !error && processed.length === 0 && (
            <div>
              <p>Nenhum cliente encontrado.</p>
              <Button onClick={openAdd}>Adicionar cliente</Button>
            </div>
          )}
          {!loading && !error && processed.length > 0 && (
            <ClientsTable rows={processed} leaders={leaders} />
          )}
        </CardBody>
      </Card>

      {showAdd && (
        <AddClientDialog
          onClose={closeAdd}
          onSubmit={(c) => {
            addClient(c);
            closeAdd();
          }}
        />
      )}
    </Layout>
  );
}

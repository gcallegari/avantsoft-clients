import { Client } from '@/features/clients/types';
import { Table } from '../../clientsPage.styles';
import { Tr } from '../Tr';
import { LeadersMap } from '../Tr/tr.types';

function ClientsTable({ rows, leaders }: { rows: Client[]; leaders: LeadersMap }) {
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

export { ClientsTable };

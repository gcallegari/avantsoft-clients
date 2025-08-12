import { Client } from '@/features/clients/types';
import { firstMissingLetter } from '@/shared/lib/strings';
import { format } from 'date-fns';
import { ptBR } from 'date-fns/locale';
import { memo } from 'react';
import { Badge, Missing, RowStyled } from './tr.styles';
import { BRL, LeadersMap } from './tr.types';

const Tr = memo(function Tr({ c, leaders }: { c: Client; leaders: LeadersMap }) {
  const freq = c.sales.length;
  const total = c.sales.reduce((s, v) => s + v.value, 0);
  const avg = freq ? total / freq : 0;
  const missing = firstMissingLetter(c.name);
  const isTop =
    leaders.topVolume?.id === c.id ||
    leaders.topAverage?.id === c.id ||
    leaders.topFrequency?.id === c.id;

  return (
    <RowStyled $highlight={isTop}>
      <td>
        <Missing title="Primeira letra do alfabeto que NÃO aparece no nome">{missing}</Missing>
      </td>
      <td>
        {c.name} {leaders.topVolume?.id === c.id && <Badge variant="brand">Top volume</Badge>}{' '}
        {leaders.topAverage?.id === c.id && <Badge variant="ok">Top média</Badge>}{' '}
        {leaders.topFrequency?.id === c.id && <Badge variant="warn">Top frequência</Badge>}
      </td>
      <td>{c.email || '—'}</td>
      <td>{c.birthdate ? format(new Date(c.birthdate), 'dd/MM/yyyy', { locale: ptBR }) : '—'}</td>
      <td>{freq}</td>
      <td>{BRL.format(total)}</td>
      <td>{BRL.format(avg)}</td>
    </RowStyled>
  );
});

export { Tr };

import type { Client } from '@/features/clients/types';
import { useState } from 'react';
import styled from 'styled-components';

const Backdrop = styled.div`
  position: fixed;
  inset: 0;
  background: #0008;
  display: grid;
  place-items: center;
  z-index: 20;
`;
const Modal = styled.div`
  width: 100%;
  max-width: 560px;
  background: var(--card);
  border: 1px solid #1f2937;
  border-radius: 16px;
  padding: 20px;
`;
const Row = styled.div`
  display: grid;
  grid-template-columns: 1fr 1fr;
  gap: 12px;
  margin: 8px 0;
  @media (max-width: 640px) {
    grid-template-columns: 1fr;
  }
`;
const Field = styled.div`
  display: flex;
  flex-direction: column;
  gap: 6px;
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
const Actions = styled.div`
  display: flex;
  justify-content: flex-end;
  gap: 8px;
  margin-top: 12px;
`;
const Button = styled.button<{ ghost?: boolean }>`
  padding: 10px 12px;
  border-radius: 10px;
  cursor: pointer;
  font-weight: 600;
  background: ${(p) => (p.ghost ? 'transparent' : 'var(--brand)')};
  color: ${(p) => (p.ghost ? 'var(--text)' : '#fff')};
  border: ${(p) => (p.ghost ? '1px solid #334155' : 'none')};
`;

export function AddClientDialog({
  onClose,
  onSubmit,
}: {
  onClose: () => void;
  onSubmit: (c: Omit<Client, 'id' | 'vendas'>) => void;
}) {
  const [nome, setNome] = useState('');
  const [email, setEmail] = useState('');
  const [nascimento, setNascimento] = useState('');
  const [error, setError] = useState('');

  const submit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!nome) return setError('Informe o nome');
    if (!email || !/^[^@\s]+@[^@\s]+\.[^@\s]+$/.test(email)) return setError('E-mail inválido');
    if (!nascimento) return setError('Informe a data de nascimento');
    onSubmit({ nome, email, nascimento });
  };

  return (
    <Backdrop onClick={onClose}>
      <Modal role="dialog" aria-modal="true" onClick={(e) => e.stopPropagation()}>
        <h3 style={{ marginTop: 0 }}>Adicionar cliente</h3>
        <form onSubmit={submit}>
          <Field>
            <label>Nome completo</label>
            <Input value={nome} onChange={(e) => setNome(e.target.value)} required />
          </Field>
          <Row>
            <Field>
              <label>Email</label>
              <Input
                type="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                required
              />
            </Field>
            <Field>
              <label>Data de nascimento</label>
              <Input
                type="date"
                value={nascimento}
                onChange={(e) => setNascimento(e.target.value)}
                required
              />
            </Field>
          </Row>
          {error && <p style={{ color: 'var(--danger)' }}>{error}</p>}
          <Actions>
            <Button type="button" ghost onClick={onClose}>
              Cancelar
            </Button>
            <Button type="submit">Salvar</Button>
          </Actions>
        </form>
      </Modal>
    </Backdrop>
  );
}

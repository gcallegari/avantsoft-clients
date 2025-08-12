import type { Client } from '@/features/clients/types';
import { useState } from 'react';
import { Actions, Backdrop, Button, Field, Input, Modal, Row } from './addClientDialog.styles';

type AddClientInput = Omit<Client, 'id' | 'sales'>;

interface AddClientDialogProps {
  onClose: () => void;
  onSubmit: (c: AddClientInput) => void;
}

const EMAIL_RE = /^[^@\s]+@[^@\s]+\.[^@\s]+$/;

function AddClientDialog({ onClose, onSubmit }: AddClientDialogProps) {
  const [nameState, setNameState] = useState('');
  const [emailState, setEmailState] = useState('');
  const [birthdateState, setBirthdateState] = useState('');
  const [error, setError] = useState('');

  const submit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    if (!nameState) {
      setError('Informe o nome');
      return;
    }
    if (!EMAIL_RE.test(emailState)) {
      setError('E-mail inválido');
      return;
    }
    if (!birthdateState) {
      setError('Informe a data de nascimento');
      return;
    }

    setError('');
    onSubmit({
      name: nameState,
      email: emailState,
      birthdate: birthdateState,
    });
  };

  return (
    <Backdrop onClick={onClose}>
      <Modal role="dialog" aria-modal="true" onClick={(e) => e.stopPropagation()}>
        <h3 style={{ marginTop: 0 }}>Adicionar cliente</h3>
        <form onSubmit={submit}>
          <Field>
            <label>Nome completo</label>
            <Input value={nameState} onChange={(e) => setNameState(e.target.value)} required />
          </Field>
          <Row>
            <Field>
              <label>Email</label>
              <Input
                type="email"
                value={emailState}
                onChange={(e) => setEmailState(e.target.value)}
                required
              />
            </Field>
            <Field>
              <label>Data de nascimento</label>
              <Input
                type="date"
                value={birthdateState}
                onChange={(e) => setBirthdateState(e.target.value)}
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

export { AddClientDialog };

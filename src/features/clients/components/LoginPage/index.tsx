import { useAuth } from '@/auth/useAuth';
import { useState } from 'react';
import { Button, Card, Field, Input, Sub, Title } from './loginPage.styles';

export function LoginPage() {
  const { login } = useAuth();
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');

  const onSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    try {
      setError('');
      await login(email, password);
    } catch (err: unknown) {
      if (err instanceof Error) {
        setError(err.message);
      } else if (typeof err === 'string') {
        setError(err);
      } else {
        setError('Ocorreu um erro desconhecido');
      }
    }
  };

  return (
    <Card>
      <Title>Entrar</Title>
      <Sub>Use qualquer e-mail e senha para esta demo</Sub>
      <form onSubmit={onSubmit}>
        <Field>
          <label>Email</label>
          <Input
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            placeholder="voce@exemplo.com"
          />
        </Field>
        <Field>
          <label>Senha</label>
          <Input
            type="password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            placeholder="••••••"
          />
        </Field>
        {error && <p style={{ color: 'var(--danger)' }}>{error}</p>}
        <Button type="submit">Entrar</Button>
      </form>
    </Card>
  );
}

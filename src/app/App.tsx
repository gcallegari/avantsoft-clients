import { useAuth } from '@/auth/useAuth';
import { ClientsPage } from '@/features/clients/components/ClientsPage';
import { ErrorBoundary } from '@/shared/ui/ErrorBoundary';
import styled from 'styled-components';

const Shell = styled.div`
  display: flex;
  flex-direction: column;
  min-height: 100dvh;
`;
const Header = styled.header`
  position: sticky;
  top: 0;
  z-index: 10;
  display: flex;
  align-items: center;
  justify-content: space-between;
  padding: 16px 20px;
  background: #0b1222cc;
  backdrop-filter: blur(8px);
  border-bottom: 1px solid #1f2937;
`;

const User = styled.div`
  color: var(--muted);
  font-size: 14px;
  button {
    margin-left: 12px;
  }
`;

function LoginPage() {
  const { login } = useAuth();
  const onSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const data = new FormData(e.currentTarget);
    login(String(data.get('email') || ''), String(data.get('password') || ''));
  };
  return (
    <div
      style={{
        maxWidth: 420,
        margin: '10vh auto',
        background: 'var(--card)',
        padding: 24,
        border: '1px solid #1f2937',
        borderRadius: 16,
      }}
    >
      <h1 style={{ marginTop: 0 }}>Entrar</h1>
      <p style={{ marginTop: 0, color: 'var(--muted)' }}>Qualquer e-mail e senha não vazios</p>
      <form onSubmit={onSubmit}>
        <div style={{ display: 'grid', gap: 8, margin: '8px 0' }}>
          <label>Email</label>
          <input
            name="email"
            placeholder="voce@exemplo.com"
            required
            style={{
              background: '#0b1222',
              color: 'var(--text)',
              border: '1px solid #334155',
              padding: '10px 12px',
              borderRadius: 10,
            }}
          />
        </div>
        <div style={{ display: 'grid', gap: 8, margin: '8px 0' }}>
          <label>Senha</label>
          <input
            type="password"
            name="password"
            required
            style={{
              background: '#0b1222',
              color: 'var(--text)',
              border: '1px solid #334155',
              padding: '10px 12px',
              borderRadius: 10,
            }}
          />
        </div>
        <button
          style={{
            width: '100%',
            padding: '10px 12px',
            background: 'var(--brand)',
            color: '#fff',
            border: 'none',
            borderRadius: 10,
            fontWeight: 600,
          }}
        >
          Entrar
        </button>
      </form>
    </div>
  );
}

export function App() {
  const { user, logout } = useAuth();
  return (
    <Shell>
      <Header>
        <img width={'165px'} height={'auto'} src="public/assets/avantsoft-logo.png" />

        <User>
          {user ? (
            <>
              {user.email}
              <button
                onClick={logout}
                style={{
                  background: 'transparent',
                  border: '1px solid #334155',
                  color: 'var(--text)',
                  padding: '6px 10px',
                  borderRadius: 8,
                  cursor: 'pointer',
                }}
              >
                Sair
              </button>
            </>
          ) : null}
        </User>
      </Header>
      <ErrorBoundary>{user ? <ClientsPage /> : <LoginPage />}</ErrorBoundary>
    </Shell>
  );
}

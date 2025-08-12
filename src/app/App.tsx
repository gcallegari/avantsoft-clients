import { useAuth } from '@/auth/useAuth';
import { ClientsPage } from '@/features/clients/components/ClientsPage';
import { LoginPage } from '@/features/clients/components/LoginPage';
import { ErrorBoundary } from '@/shared/ui/ErrorBoundary';
import { Header, Shell, User } from './styles';

function App() {
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

export { App };

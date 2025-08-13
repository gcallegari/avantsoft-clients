import { styled } from 'styled-components';

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

export { Header, Shell, User };

import { styled } from 'styled-components';

const RowStyled = styled.tr<{ $highlight?: boolean }>`
  outline: ${({ $highlight }) => ($highlight ? '2px solid var(--brand)' : 'none')};
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

export { Badge, Missing, RowStyled };

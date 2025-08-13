import { styled } from 'styled-components';

const Card = styled.div`
  width: 100%;
  max-width: 420px;
  margin: 10vh auto;
  padding: 28px;
  background: var(--card);
  border: 1px solid #1f2937;
  border-radius: 16px;
  box-shadow: var(--shadow);
`;

const Title = styled.h1`
  margin: 0 0 8px;
  font-size: 24px;
`;

const Sub = styled.p`
  margin: 0 0 20px;
  color: var(--muted);
`;

const Field = styled.div`
  display: flex;
  flex-direction: column;
  gap: 6px;
  margin: 10px 0;
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

const Button = styled.button`
  width: 100%;
  padding: 10px 12px;
  border-radius: 10px;
  border: none;
  cursor: pointer;
  background: var(--brand);
  color: white;
  font-weight: 600;
  &:hover {
    filter: brightness(1.05);
  }
`;

export { Button, Card, Field, Input, Sub, Title };

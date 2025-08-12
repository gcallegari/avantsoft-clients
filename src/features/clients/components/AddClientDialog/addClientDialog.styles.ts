import { styled } from "styled-components";

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

export { Actions, Backdrop, Button, Field, Input, Modal, Row };

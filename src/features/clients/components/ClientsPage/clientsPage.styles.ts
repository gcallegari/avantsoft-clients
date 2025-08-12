import { styled } from "styled-components";

const Layout = styled.main`
  width: 100%;
  max-width: 1200px;
  margin: 24px auto;
  padding: 0 16px;
  display: grid;
  gap: 16px;
`;

const Toolbar = styled.div`
  display: flex;
  align-items: center;
  justify-content: space-between;
  gap: 12px;
  flex-wrap: wrap;
`;

const HStack = styled.div`
  display: flex;
  gap: 8px;
  align-items: center;
  flex-wrap: wrap;
`;

const Button = styled.button`
  background: var(--brand);
  color: white;
  border: none;
  padding: 10px 12px;
  border-radius: 10px;
  cursor: pointer;
  font-weight: 600;
  &:hover {
    filter: brightness(1.05);
  }
`;

const Card = styled.section`
  background: var(--card);
  border: 1px solid #1f2937;
  border-radius: 16px;
  box-shadow: var(--shadow);
`;

const CardHead = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding: 14px 16px;
  border-bottom: 1px solid #1f2937;
`;

const CardBody = styled.div`
  padding: 16px;
`;

const Table = styled.table`
  width: 100%;
  border-collapse: separate;
  border-spacing: 0;
  thead th {
    position: sticky;
    top: 0;
    background: #0b1222;
    z-index: 1;
  }
  th,
  td {
    text-align: left;
    padding: 12px 14px;
    border-bottom: 1px solid #1f2937;
  }
  tbody tr:hover {
    background: #0b1222;
  }
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

export { Button, Card, CardBody, CardHead, HStack, Input, Layout, Table, Toolbar };

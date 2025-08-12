import { createGlobalStyle } from 'styled-components';

export const GlobalStyle = createGlobalStyle`
  :root {
    --brand: #026CB6;
    --bg: #0f172a; --card: #111827; --text: #e5e7eb; --muted: #9ca3af;
  }
  *{box-sizing:border-box}
  html,body,#root{height:100%}
  body{margin:0;background:linear-gradient(180deg,#0b1324 0%, #0f172a 100%);color:var(--text);font-family:Inter, system-ui, Avenir, Helvetica, Arial, sans-serif}
  a{color:var(--brand)}
  ::-webkit-scrollbar { width: 10px; height: 10px; }
  ::-webkit-scrollbar-thumb { background: var(--brand); border-radius: 8px; }
  ::-webkit-scrollbar-track { background: #1f2937; }
`;
export const theme = {
  colors: { brand: 'var(--brand)', text: 'var(--text)' },
  shadow: '0 1px 4px rgba(4,30,66,0.16)',
} as const;

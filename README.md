# Avantsoft Clients — Desafio Técnico

Aplicação em **React + TypeScript + styled-components** desenvolvida para o desafio técnico da Avantsoft.  
Permite gerenciar clientes, visualizar estatísticas de vendas e aplicar tratamento a dados retornados por uma API com formato desorganizado.

## 🚀 Tecnologias

- [React](https://react.dev/)
- [TypeScript](https://www.typescriptlang.org/)
- [styled-components](https://styled-components.com/)
- [Vite](https://vitejs.dev/)
- [Recharts](https://recharts.org/)
- [Zod](https://zod.dev/) (validações)
- [date-fns](https://date-fns.org/)

---

## 📦 Instalação e execução

> **Pré-requisito**: Node.js >= 18 (recomendado 20.x)

```bash
# 1. Clone o repositório
git clone https://github.com/seu-usuario/avantsoft-clients.git

cd avantsoft-clients

# 2. Instale as dependências
npm install

# 3. Inicie o servidor de desenvolvimento
npm run dev
```

---

## 🔑 Login

A autenticação é **simples e apenas no front-end** (não há backend real).  
Use qualquer e-mail e qualquer senha não vazios.

Exemplo:

```
Email: teste@example.com
Senha: 123456
```

---

## 📝 Funcionalidades

- **Login** e logout (token armazenado no `localStorage`).
- **Listagem de clientes** com dados tratados:
  - Remove duplicados.
  - Extrai apenas informações relevantes.
  - Normaliza estrutura recebida.
- **Adição de clientes** via modal.
- **Busca** por nome ou e-mail.
- **Gráfico** de vendas por dia (soma de todas as vendas no período).
- **Métricas destacadas**:
  - Cliente com maior **volume total** de vendas.
  - Cliente com maior **média por venda**.
  - Cliente com maior **frequência de compras**.
- **Indicador alfabético**:
  - Mostra a **primeira letra do alfabeto** que **não** aparece no nome completo do cliente.
  - Exibe `"-"` se todas as letras de `a-z` estiverem presentes.

---

## 📂 Estrutura

```
src/
  pages/
    ClientsPage.tsx   # Página principal com tabela e gráfico
    LoginPage.tsx     # Página de login
  state/
    AppContext.tsx    # Contexto global, autenticação e estado de clientes
  utils/
    normalize.ts      # Funções de tratamento e agregação de dados
  ui/
    AddClientModal.tsx
    SalesChart.tsx
  services/
    api.ts            # Consumo de dados (mock ou API real)
public/
  mock/clients.json   # Dados no formato original fornecido no desafio
```

---

## 📊 API (Mock)

Por padrão, o projeto consome o arquivo `public/mock/clients.json`, que simula a resposta real do endpoint.  
Para usar uma API real, basta editar `src/services/api.ts` e alterar `fetchClients()` e `fetchStats()`.

---

## 🎨 Design

- Tema escuro inspirado na paleta do [site da Avantsoft](https://avantsoft.com.br/pt-br/#portfolioSection).
- Layout responsivo.
- Estilização com **styled-components**.

---

## 🧪 Possíveis melhorias

- Validação de formulários com Zod.
- Ordenação avançada na tabela.
- Persistência de novos clientes no backend real.
- Paginação.

---

## 📄 Licença

Este projeto é apenas para fins de avaliação técnica.

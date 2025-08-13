# Avantsoft Clients — Desafio Técnico

Aplicação desenvolvida com **React + TypeScript + styled-components** para o desafio técnico da Avantsoft.  
Permite gerenciar clientes, visualizar estatísticas de vendas e tratar dados provenientes de uma API com estrutura não padronizada.

---

## 🎯 Tecnologias

- [React](https://react.dev/)  
- [TypeScript](https://www.typescriptlang.org/)  
- [styled-components](https://styled-components.com/)  
- [Vite](https://vitejs.dev/)  
- [Recharts](https://recharts.org/)  
- [Zod](https://zod.dev/) — validação de dados  
- [date-fns](https://date-fns.org/) — manipulação de datas  
- [Vitest](https://vitest.dev/) — testes unitários  
- [Prettier](https://prettier.io/) — formatação de código  

---

## 🚀 Instalação e execução

**Pré-requisito:** Node.js ≥ 18 (recomendado: 20.x)

```bash
git clone https://github.com/gcallegari/avantsoft-clients.git
cd avantsoft-clients
npm install
npm run dev
```

---

## 🔑 Login (simples)

A autenticação é simulada e acontece apenas no front-end (não há backend).  
Use qualquer e-mail e senha não vazios:

```
Email: teste@example.com  
Senha: 123456
```

---

## 📋 Funcionalidades

- Login e logout (token armazenado em `localStorage`).  
- Listagem de clientes com dados tratados:
  - Remoção de duplicados.  
  - Estrutura normalizada a partir da API “bagunçada”.  
- Adição de clientes via modal.  
- Busca por nome ou e-mail.  
- Gráfico de vendas por dia (somatório).  
- Destaques:
  - Cliente com maior **volume total** de vendas.  
  - Cliente com maior **média por venda**.  
  - Cliente com maior **frequência de compras**.  
- Indicador alfabético: mostra a primeira letra do alfabeto que **não aparece** no nome; exibe `-` se todas estiverem presentes.

---

## 📂 Estrutura de pastas

```
src/
  features/
    clients/
      api/          # Requisições e parsing
      components/   # Pages, tabelas, modais, gráfico
      lib/          # Normalizadores, utilitários, tipos
  shared/
    styles/         # Tema, global styles
    ui/             # Componentes reutilizáveis
public/
  mock/clients.json  # Dados em formato original (mock)
tests/               # Testes unitários
```

---

## 🧪 Testes

Execute todos os testes com cobertura:
```bash
npm run test
```

Para modo contínuo (watch):
```bash
npm run test:watch
```

---

## 🪄 Formatação de código

Formate todos os arquivos com:
```bash
npm run format
```

---

## 📈 Possíveis melhorias
 
- Ordenação e filtros mais avançados.  
- Paginação e persistência dos clientes (backend real).  
- Testes adicionais (componentes, hooks).  
- Virtualização de lista para performance em casos com muitos clientes.

---

## 📜 Licença

Projeto criado exclusivamente para fins de avaliação técnica.

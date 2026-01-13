# Desafio Loomi 

Interface moderna, buscando proporcionar uma experiência de operador fluida, moderna e responsiva, integrando-se a uma API legado imutável.

## Visão Geral

- Dashboard com gráficos (evolução de KPI, barras de conversão e mapa de clientes).
- Gestão de tickets com filtros, tabela e ações.
- Chat IA com atualizações periódicas.
- Simulador de planos com seleção de opções e ajustes de perfil do cliente.


## Stack Técnica

- Framework: `Next.js 16.1.1 (App Router + Turbopack)`
- Linguagem: `TypeScript`
- Estilos: `Tailwind CSS`
- Estado assíncrono: `@tanstack/react-query`
- Gráficos: `apexcharts `
- Mapas: `ol` (OpenLayers)

## Requisitos

- Node.js 18+
- npm 9+ (ou yarn/pnpm equivalente)

## Como Rodar

1. Instalar dependências:
   ```bash
   npm install
   ```
2. Ambiente: criar `.env.local` com variaveis conforme `env.example`.
3. Desenvolvimento:
   ```bash
   npm run dev
   ```
4. Lint:
   ```bash
   npm run lint
   ```
5. Build de produção:
   ```bash
   npm run build
   ```
6. Start de produção:
   ```bash
   npm run start
   ```

## Scripts Úteis

- `npm run dev`: inicia servidor de desenvolvimento com Turbopack.
- `npm run build`: compila para produção.
- `npm run start`: inicia servidor com build gerado.
- `npm run lint`: executa linter.

### Dashboard

- KPI Trends: gráfico de áreas com múltiplas séries (ARPU, retenção, conversão, churn).
- Mapa de clientes: OpenLayers, overlay e filtros.

### Simulador de Planos

- Seleção de planos com preços, destaque de recomendado.
- Benefícios adicionais com custos incrementais.
- Skeleton no carregamento; após dados, animação de “cards subindo um a um” com GSAP.

### Gestão de Tickets

- Tabela com filtros e paginação.
- Ações contextuais (ver/editar) e métricas.

### Chat com IA

- Mensagens atualizadas periodicamente via React Query.
- Componentes de UI pensados para leitura confortável.

## Carregamento Assíncrono e Estabilidade

Para evitar erros de hidratação em SSR/CSR:

- Skeletons visuais ao invés de textos variáveis durante o carregamento.
- Condicionais client-only em componentes SSR na fase de hidratação.

## Estilos e Tema

- Tailwind configurado em `globals.css`.

## Qualidade e Acessibilidade

- Lint e TypeScript ativos; recomenda-se manter o código sem warnings.
- ARIA aplicado em elementos interativos (e.g., botões e inputs) e gráficos.

## API Interna

- Endpoints em `src/app/api/*` (e.g., `/api/nortus-v1/dashboard`, `/api/map/locations`, `/api/tickets`).

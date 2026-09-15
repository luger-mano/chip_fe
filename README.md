# CHIP — Front-end

Base com React, Next.js (App Router), TypeScript, ESLint e CSS Modules.

## Executar

Use Node.js 24 (indicado no `.nvmrc`) e npm.

```bash
npm ci
npm run dev
```

Acesse http://localhost:3000. No PowerShell com scripts bloqueados, use `npm.cmd` no lugar de `npm`.

## Comandos

| Comando | Descrição |
| --- | --- |
| `npm run dev` | Desenvolvimento |
| `npm run build` | Build de produção |
| `npm start` | Executa o build de produção |
| `npm run lint` | Valida o código com ESLint |
| `npm run typecheck` | Gera tipos das rotas e verifica TypeScript |
| `npm run check` | Executa lint e verificação de tipos |

## Estrutura

```text
public/images/           Imagens estáticas
src/
  app/                   Rotas, layout, carregamento e páginas de erro
  components/
    layout/              Componentes estruturais
    ui/                  Componentes visuais reutilizáveis
  config/                Configuração compartilhada
  features/
    home/components/     Componentes da página inicial
  hooks/                 Hooks React compartilhados
  lib/                   Utilitários e configuração de bibliotecas
  services/              Integrações com APIs
  styles/                Estilos globais e variáveis CSS
  types/                 Tipos compartilhados
```

## Convenções

- Utilize `@/` para importar arquivos de `src/`.
- Crie rotas em `src/app` e organize cada funcionalidade em `src/features/<nome>`.
- Componentes são Server Components por padrão. Adicione `"use client"` quando precisar de estado, eventos ou APIs do navegador.
- Use CSS Modules (`*.module.css`) para estilos locais.
- Mantenha hooks e tipos específicos junto da funcionalidade; use pastas compartilhadas quando houver reutilização.
- A página inicial é provisória. Ainda não há integração com backend ou autenticação.
- TypeScript está limitado à série 6.0 e ESLint à série 9 por compatibilidade com os plugins de `eslint-config-next`. O npm sinaliza o ESLint 9 como fora de suporte; revise essa versão quando os plugins suportarem ESLint 10.

## Ambiente

Nenhuma variável é necessária para executar a base. Ao adicionar integrações, documente as variáveis em `.env.example` e crie `.env.local` com seus valores. Variáveis com prefixo `NEXT_PUBLIC_` são expostas ao navegador; nunca use esse prefixo para segredos.

## Referências

- [Next.js — instalação e App Router](https://nextjs.org/docs/app/getting-started/installation)
- [React](https://react.dev/learn)

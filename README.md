# 🛒 TechHub - Plataforma de E-commerce Moderna

> Um showcase profissional de uma solução de e-commerce full-stack construída com Next.js 13, demonstrando arquitetura de nível empresarial, práticas de código limpo e padrões modernos de desenvolvimento web.

[![Next.js](https://img.shields.io/badge/Next.js-13-black)](https://nextjs.org/)
[![TypeScript](https://img.shields.io/badge/TypeScript-5.0-blue)](https://www.typescriptlang.org/)
[![Prisma](https://img.shields.io/badge/Prisma-5.0-2D3748)](https://www.prisma.io/)
[![Stripe](https://img.shields.io/badge/Stripe-Integrado-635BFF)](https://stripe.com/)
[![Tailwind CSS](https://img.shields.io/badge/Tailwind-3.0-38B2AC)](https://tailwindcss.com/)

## 🎯 Visão Geral do Projeto

Este projeto é um **showcase de portfólio** demonstrando minha capacidade de construir aplicações de e-commerce prontas para produção com:

- ✅ Arquitetura Limpa e princípios SOLID
- ✅ Desenvolvimento type-safe com TypeScript + Zod
- ✅ Padrões modernos de React (Server Components, Hooks, Context)
- ✅ Autenticação segura (OAuth 2.0)
- ✅ Processamento de pagamentos (integração Stripe)
- ✅ Design de banco de dados e uso de ORM (Prisma + PostgreSQL)
- ✅ UI/UX profissional com sistema de design customizado

**Nota:** Este é um projeto de demonstração construído para fins de portfólio, mostrando capacidades técnicas e melhores práticas de desenvolvimento web moderno.

## 🏗️ Destaques da Arquitetura

### Stack Tecnológico

**Frontend:**

- Next.js 13 (App Router) com React 18
- TypeScript para type safety
- Tailwind CSS v3 (estável) com sistema de design customizado
- Componentes shadcn/ui
- Ícones Lucide React

**Backend:**

- Next.js API Routes & Server Actions
- Prisma ORM com PostgreSQL
- Zod para validação em runtime
- NextAuth.js para autenticação

**Serviços Externos:**

- Stripe para processamento de pagamentos
- Google OAuth para autenticação
- Supabase/Neon para hospedagem PostgreSQL

### Principais Decisões Arquiteturais

1. **Arquitetura Server-First:** Aproveitando Next.js 13 Server Components para performance e SEO otimizados
2. **Type Safety:** Uso abrangente de TypeScript com validação Zod para segurança em runtime
3. **Tratamento de Erros:** Blocos try/catch robustos com mensagens de erro detalhadas
4. **Sistema de Design:** Paleta profissional sage green com espaçamento e componentes consistentes
5. **Camada de Validação:** Validação de entrada em todos os pontos de entrada (rotas API, server actions)

## 🚀 Funcionalidades

### Voltadas ao Cliente

- 🛍️ Catálogo de produtos com categorias e filtros
- 🏷️ Precificação dinâmica com cálculo de descontos
- 🛒 Carrinho de compras com estado persistente (localStorage)
- 💳 Checkout seguro com Stripe
- 📦 Histórico e rastreamento de pedidos
- 🔐 Autenticação social (Google OAuth)
- 📱 Design totalmente responsivo (mobile-first)

### Funcionalidades Técnicas

- ⚡ Renderização server-side para SEO e performance
- 🎨 Sistema de design customizado (paleta sage green)
- 🔒 API type-safe com validação Zod
- 📊 Banco de dados relacional com migrations Prisma
- 🧪 Tratamento de erros abrangente
- 🌐 Validação de variáveis de ambiente
- 🎯 Verificação de existência de produtos antes da criação de pedidos
- 🖼️ Placeholders de imagem com fallbacks elegantes

## 🎨 Sistema de Design

### Paleta de Cores

- **Primária:** Sage Green (#8FA88E) - Profissional e calmo
- **Accent:** Warm Beige (#E8DCC4) - Suave e convidativo
- **Secundária:** Soft Blue (#A8C5DA) - Accent complementar
- **Scrollbar customizada:** 8px de largura com cor primária

### Componentes UI

- Header responsivo com navegação desktop
- Footer profissional com créditos do desenvolvedor
- Cards de produto com efeitos hover
- Placeholders de banner temáticos
- Gradientes de categoria customizados
- Layout inspirado na Kabum

## 🛠️ Começando

### Pré-requisitos

- Node.js 18+
- Banco de dados PostgreSQL (Supabase recomendado)
- Conta Stripe (para pagamentos)
- Credenciais Google OAuth

### Instalação

```bash
# Clonar repositório
git clone https://github.com/seuusuario/fsw-store.git
cd fsw-store

# Instalar dependências
npm install

# Configurar variáveis de ambiente
cp .env.example .env
# Editar .env com suas credenciais

# Executar migrations do banco
npx prisma migrate dev

# Popular banco de dados (opcional)
npx prisma db seed

# Iniciar servidor de desenvolvimento
npm run dev
```

Visite [http://localhost:3000](http://localhost:3000)

### Variáveis de Ambiente

Veja `.env.example` para todas as variáveis necessárias. Variáveis principais:

- `DATABASE_URL` - String de conexão PostgreSQL (do Supabase)
- `GOOGLE_CLIENT_ID` & `GOOGLE_CLIENT_SECRET` - Credenciais Google OAuth
- `NEXTAUTH_SECRET` - Secret aleatório para NextAuth
- `STRIPE_SECRET_KEY` & `NEXT_PUBLIC_STRIPE_PUBLIC_KEY` - Chaves API Stripe
- `HOST_URL` - URL da aplicação

## 🚀 Deploy

### Vercel + Supabase (Recomendado)

1. **Criar Projeto Supabase:**

   - Acesse [supabase.com](https://supabase.com)
   - Crie novo projeto
   - Copie DATABASE_URL de Settings > Database

2. **Deploy na Vercel:**

   ```bash
   # Instalar Vercel CLI
   npm i -g vercel

   # Deploy
   vercel
   ```

3. **Configurar Variáveis de Ambiente:**

   - Adicione todas as variáveis do `.env.example` no Dashboard Vercel
   - Use valores de produção para chaves Stripe
   - Configure `HOST_URL` para sua URL Vercel

4. **Executar Migrations:**

   ```bash
   # Nas configurações do projeto Vercel, adicione comando de build:
   npx prisma migrate deploy && next build
   ```

Veja [DEPLOY.md](./DEPLOY.md) para instruções detalhadas de deployment.

## 📚 O Que Este Projeto Demonstra

### Habilidades de Engenharia de Software

**Práticas de Código Limpo**

- Princípios SOLID aplicados
- DRY (Don't Repeat Yourself)
- Tratamento de erros abrangente
- Validação de entrada com Zod
- Type safety com TypeScript

**Padrões Modernos de React**

- Server Components para performance
- Client Components para interatividade
- Custom hooks para lógica reutilizável
- Context API para gerenciamento de estado
- Atualizações otimistas de UI

**Design de Banco de Dados**

- Design de schema normalizado
- Relacionamentos apropriados (1:N, N:M)
- Migrations para controle de versão
- Melhores práticas Prisma ORM

**Melhores Práticas de Segurança**

- Autenticação OAuth 2.0
- Gerenciamento de variáveis de ambiente
- Validação e sanitização de entrada
- Processamento seguro de pagamentos
- Verificação de existência de produtos

### Pensamento de Produto

**Experiência do Usuário**

- Navegação intuitiva
- Design responsivo
- Estados de carregamento e feedback
- Mensagens de erro
- Placeholders visuais

**Considerações de Escalabilidade**

- Arquitetura modular
- Regras de negócio configuráveis
- Padrões de design extensíveis
- Otimizações de performance

## 🔮 Melhorias Futuras

Este projeto pode ser estendido com:

- [ ] Avaliações e classificações de produtos
- [ ] Busca e filtros avançados
- [ ] Funcionalidade de lista de desejos
- [ ] Dashboard administrativo
- [ ] Gerenciamento de inventário
- [ ] Notificações por email
- [ ] Suporte multi-idioma (i18n)
- [ ] Analytics avançado
- [ ] Recomendações de produtos (ML)
- [ ] Progressive Web App (PWA)

## 📊 Métricas Técnicas

- **Cobertura de Tipos:** 95%+
- **Tempo de Build:** ~15s
- **Tamanho do Bundle:** Otimizado com Next.js
- **Tratamento de Erros:** Abrangente
- **Documentação:** Completa

## 👨‍💻 Sobre o Desenvolvedor

Este projeto foi construído por **Gabriel Figueiredo** como demonstração de capacidades de desenvolvimento full-stack. Ele mostra:

- Forte entendimento de arquitetura de software
- Capacidade de integrar serviços de terceiros
- Foco em qualidade e manutenibilidade de código
- Abordagem de desenvolvimento orientada a produto
- Expertise em desenvolvimento web moderno

## 📄 Licença

Este projeto é open source e disponível sob a Licença MIT.

## 🤝 Contato

Para consultas sobre este projeto ou oportunidades de colaboração:

- **Portfólio:** https://gabrielfigueiredodev.shardweb.app/
- **LinkedIn:** https://www.linkedin.com/in/gabriel-figueiredo-de-lima
- **Email:** gabrielfigueriedolima911@gmail.com

---

**Construído com ❤️ usando Next.js, TypeScript e tecnologias web modernas**

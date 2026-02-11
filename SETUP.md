# 🚀 Guia de Configuração - FSW Store

## 📋 Pré-requisitos

- [Node.js](https://nodejs.org/) 18+ instalado
- [Docker](https://www.docker.com/get-started) e Docker Compose instalados
- [Git](https://git-scm.com/) instalado

## 🐳 Início Rápido com Docker (Recomendado)

### 1. Clonar o Repositório

```bash
git clone <url-do-seu-repo>
cd fsw-store
```

### 2. Configurar Variáveis de Ambiente

```bash
# Copiar o arquivo de exemplo
cp .env.example .env

# Editar .env com suas credenciais
# Para desenvolvimento local, a URL do banco já está configurada para Docker
```

### 3. Iniciar PostgreSQL com Docker Compose

```bash
# Iniciar PostgreSQL e pgAdmin
docker-compose up -d

# Verificar se os containers estão rodando
docker-compose ps
```

Isso iniciará:

- **PostgreSQL** em `localhost:5432`
- **pgAdmin** em `http://localhost:5050` (UI opcional para o banco)

### 4. Instalar Dependências

```bash
npm install
```

### 5. Configurar Banco de Dados

```bash
# Executar migrations do Prisma
npx prisma migrate dev

# (Opcional) Popular o banco com dados de exemplo
npx prisma db seed
```

### 6. Iniciar Servidor de Desenvolvimento

```bash
npm run dev
```

Visite [http://localhost:3000](http://localhost:3000) 🎉

---

## 🔧 Configuração Manual (Sem Docker)

Se preferir instalar o PostgreSQL manualmente:

### 1. Instalar PostgreSQL

- **Windows:** Download em [postgresql.org](https://www.postgresql.org/download/windows/)
- **macOS:** `brew install postgresql@15`
- **Linux:** `sudo apt-get install postgresql-15`

### 2. Criar Banco de Dados

```bash
# Conectar ao PostgreSQL
psql -U postgres

# Criar banco de dados
CREATE DATABASE fsw_store;

# Sair
\q
```

### 3. Atualizar .env

```bash
# Atualizar DATABASE_URL com suas credenciais PostgreSQL
DATABASE_URL="postgresql://seu-usuario:sua-senha@localhost:5432/fsw_store?schema=public"
```

### 4. Continuar a partir do Passo 4 do Início Rápido

---

## 🔑 Configuração de Variáveis de Ambiente

### Variáveis Obrigatórias

#### 1. Banco de Dados (Já configurado para Docker)

```env
DATABASE_URL="postgresql://postgres:postgres@localhost:5432/fsw_store?schema=public"
```

#### 2. NextAuth Secret

Gerar um secret seguro:

```bash
# No Linux/macOS
openssl rand -base64 32

# No Windows (PowerShell)
[Convert]::ToBase64String((1..32 | ForEach-Object { Get-Random -Minimum 0 -Maximum 256 }))
```

Copiar o resultado para `.env`:

```env
NEXTAUTH_SECRET="seu-secret-gerado-aqui"
```

#### 3. Google OAuth (Obrigatório para Login)

1. Acesse [Google Cloud Console](https://console.cloud.google.com/)
2. Crie um novo projeto ou selecione um existente
3. Ative a API Google+
4. Vá em **Credentials** → **Create Credentials** → **OAuth 2.0 Client ID**
5. Configure a tela de consentimento OAuth
6. Adicione URI de redirecionamento autorizada: `http://localhost:3000/api/auth/callback/google`
7. Copie Client ID e Client Secret para `.env`:

```env
GOOGLE_CLIENT_ID="seu-client-id.apps.googleusercontent.com"
GOOGLE_CLIENT_SECRET="seu-client-secret"
```

#### 4. Stripe (Obrigatório para Pagamentos)

1. Acesse [Stripe Dashboard](https://dashboard.stripe.com/register)
2. Crie uma conta ou faça login
3. Vá em **Developers** → **API Keys**
4. Copie as chaves de teste para `.env`:

```env
STRIPE_SECRET_KEY="sk_test_..."
NEXT_PUBLIC_STRIPE_PUBLIC_KEY="pk_test_..."
```

5. Configurar webhook (para confirmação de pagamento):

```bash
# Instalar Stripe CLI
# https://stripe.com/docs/stripe-cli

# Login no Stripe
stripe login

# Encaminhar webhooks para servidor local
stripe listen --forward-to localhost:3000/api/order/payment-success
```

---

## 🗄️ Gerenciamento do Banco de Dados

### Usando pgAdmin (Docker)

1. Acesse pgAdmin em [http://localhost:5050](http://localhost:5050)
2. Faça login com:
   - Email: `admin@admin.com`
   - Senha: `admin`
3. Adicione novo servidor:
   - Host: `postgres` (nome do container)
   - Porta: `5432`
   - Banco: `fsw_store`
   - Usuário: `postgres`
   - Senha: `postgres`

### Usando Prisma Studio

```bash
npx prisma studio
```

Abre em [http://localhost:5555](http://localhost:5555)

### Comandos Comuns do Prisma

```bash
# Gerar Prisma Client
npx prisma generate

# Criar migration
npx prisma migrate dev --name nome-da-sua-migration

# Resetar banco de dados (⚠️ deleta todos os dados)
npx prisma migrate reset

# Visualizar banco no navegador
npx prisma studio

# Popular banco de dados
npx prisma db seed
```

---

## 🐛 Solução de Problemas

### Porta Já em Uso

Se a porta 5432 já estiver em uso:

```bash
# Parar containers Docker
docker-compose down

# Verificar o que está usando a porta
# Windows
netstat -ano | findstr :5432

# Linux/macOS
lsof -i :5432

# Alterar porta no docker-compose.yml
ports:
  - "5433:5432"  # Usar 5433 ao invés

# Atualizar DATABASE_URL no .env
DATABASE_URL="postgresql://postgres:postgres@localhost:5433/fsw_store?schema=public"
```

### Erro de Conexão com Banco de Dados

```bash
# Verificar se PostgreSQL está rodando
docker-compose ps

# Ver logs do PostgreSQL
docker-compose logs postgres

# Reiniciar containers
docker-compose restart
```

### Erros de Migration do Prisma

```bash
# Resetar banco e migrations
npx prisma migrate reset

# Se não funcionar, deletar pasta migrations e recriar
rm -rf prisma/migrations
npx prisma migrate dev --name init
```

### Problemas com Node Modules

```bash
# Limpar cache e reinstalar
rm -rf node_modules package-lock.json
npm install
```

---

## 🧪 Testando a Configuração

### 1. Verificar Conexão com Banco

```bash
# Deve mostrar o schema do seu banco
npx prisma db pull
```

### 2. Verificar se Dados de Seed Foram Carregados

```bash
# Abrir Prisma Studio
npx prisma studio

# Verificar se produtos e categorias existem
```

### 3. Testar Aplicação

1. Visite [http://localhost:3000](http://localhost:3000)
2. Produtos devem estar visíveis
3. Tente adicionar ao carrinho
4. Tente login com Google
5. Tente checkout (use cartão de teste Stripe: `4242 4242 4242 4242`)

---

## 🚀 Deploy em Produção

### Build para Produção

```bash
# Build do Next.js
npm run build

# Iniciar servidor de produção
npm start
```

### Build Docker para Produção

```bash
# Construir imagem Docker
docker build -t fsw-store .

# Executar container
docker run -p 3000:3000 --env-file .env fsw-store
```

---

## 📚 Recursos Adicionais

- [Documentação Next.js](https://nextjs.org/docs)
- [Documentação Prisma](https://www.prisma.io/docs)
- [Documentação NextAuth](https://next-auth.js.org/)
- [Documentação Stripe](https://stripe.com/docs)
- [Documentação Docker](https://docs.docker.com/)

---

## 🆘 Precisa de Ajuda?

Se encontrar algum problema:

1. Verifique a seção [Solução de Problemas](#-solução-de-problemas)
2. Revise as variáveis de ambiente no `.env`
3. Verifique logs dos containers Docker: `docker-compose logs`
4. Certifique-se de que todos os pré-requisitos estão instalados

---

**Bom código! 🎉**

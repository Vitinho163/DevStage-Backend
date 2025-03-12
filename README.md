<h1 align="center">DevStage: Back-End</h1>

<div align="center">
  <a href="#english">English</a> |
  <a href="#portugues">Português</a>
</div>

---

# English <a name="english"></a>

DevStage - Back-End is a **Node.js** application built with **Fastify**, designed to manage event subscriptions, invitation tracking and ranking. The system uses **PostgreSQL** for database storage and **Redis** for invitation tracking and click counting.

## Summary

- [Technologies Used](#technologies-used-en)
- [Project Structure](#project_structure_en)
- [Installation](#installation-en)
- [Deploy](#deploy-en)
- [Frontend](#frontend-en)
- [Author](#author-en)

## 🚀 Technologies Used <a name="technologies-used-en"></a>

- **[Fastify](https://www.fastify.io/)**: High-performance web framework for Node.js.
- **[Fastify CORS](https://github.com/fastify/fastify-cors)**: CORS plugin for Fastify.
- **[Fastify Swagger](https://github.com/fastify/fastify-swagger)**: OpenAPI documentation plugin.
- **[Fastify Swagger UI](https://github.com/fastify/fastify-swagger-ui)**: User-friendly Swagger documentation UI.
- **[Drizzle ORM](https://github.com/drizzle-team/drizzle-orm)**: TypeScript ORM for database interactions.
- **[Fastify Type Provider Zod](https://github.com/fastify/fastify-type-provider-zod)**: Zod integration for type validation.
- **[ioredis](https://github.com/luin/ioredis)**: Redis client for Node.js.
- **[PostgreSQL](https://www.postgresql.org/)**: Open-source relational database system.
- **[Zod](https://zod.dev/)**: TypeScript schema validation library.
- **[BiomeJS](https://biomejs.dev/)**: Code formatter and linter.
- **[TypeScript](https://www.typescriptlang.org/)**: JavaScript with static types.
- **[Tsup](https://github.com/egoist/tsup)**: TypeScript bundler.

## 📁 Project Structure <a name="project_structure_en"></a>

```
├── src
│ ├── drizzle (/migrations, /schema, client.ts)
│ ├── functions: contains exported function files
│ ├── redis (client.ts)
│ ├── routes: contains all application routes
│ ├── server.ts: initializes the application
│ ├── env.ts: validates environment variables with Zod
├── .env.example: example environment variables file
```

## 🛠️ Installation <a name="installation-en"></a>

1. Clone the repository:
```bash
git clone https://github.com/Vitinho163/DevStage-Backend.git
```

2. Install dependencies:
```bash
npm install
```

3. Rename `.env.example` to `.env` and fill in the required information:
```bash
PORT=3333

# URLs

WEB_URL="http://localhost:3000"

# Database

POSTGRES_URL="postgresql://docker:docker@localhost:5432/connect"
POSTGRES_REPLICA_URL="postgresql://docker:docker@localhost:5433/connect"
REDIS_URL="redis://localhost:6379"

# OpenAI

OPENAI_API_KEY="SUA_KEY"
```

4. Start Docker containers for database and Redis:
```bash
docker compose up -d
```

5. Run the database migration:
```bash
npm run db:migrate
```

6. Start the server:
```bash
npm run dev
```

## 💻 Deploy <a name="deploy-en"></a>

The backend is hosted on Render and can be accessed at:
```
https://devstage-backend.onrender.com/docs
```

> Note: The application may take some time to respond if it's idle due to Render's free-tier limitations.

## 🔗 Frontend <a name="frontend-en"></a>
Check out the front-end of the project here:
```
https://github.com/Vitinho163/DevStage-Frontend
```

<div align="center" name="author-en">
  <h4>Created with ❤️ by <a href="https://github.com/Vitinho163">João Victor</a></h4>
</div>

---

# Português <a name="portugues"></a>

DevStage - Back-End é uma aplicação **Node.js** desenvolvida com **Fastify**, projetada para gerenciar inscrições em eventos, rastreamento de convites e ranking. O sistema utiliza **PostgreSQL** para armazenamento de dados e **Redis** para rastreamento de convites e contagem de cliques.

## Sumário

- [Tecnologias Utilizadas](#tecnologias-usadas-pt)
- [Estrutura do Projeto](#estrutura-do-projeto-pt)
- [Instalação](#instalacao-pt)
- [Deploy](#deploy-pt)
- [Frontend](#frontend-pt)
- [Autor](#autor-pt)

## 🚀 Tecnologias Utilizadas <a name="tecnologias-usadas-pt"></a>

- **[Fastify](https://www.fastify.io/)**: Framework web de alto desempenho para Node.js.
- **[Fastify CORS](https://github.com/fastify/fastify-cors)**: Plugin de CORS para Fastify.
- **[Fastify Swagger](https://github.com/fastify/fastify-swagger)**: Plugin de documentação OpenAPI.
- **[Fastify Swagger UI](https://github.com/fastify/fastify-swagger-ui)**: Interface amigável para Swagger.
- **[Drizzle ORM](https://github.com/drizzle-team/drizzle-orm)**: ORM leve para TypeScript.
- **[Fastify Type Provider Zod](https://github.com/fastify/fastify-type-provider-zod)**: Integração do Fastify com Zod.
- **[ioredis](https://github.com/luin/ioredis)**: Cliente Redis para Node.js.
- **[PostgreSQL](https://www.postgresql.org/)**: Banco de dados relacional open-source.
- **[Zod](https://zod.dev/)**: Biblioteca de validação de esquemas para TypeScript.
- **[BiomeJS](https://biomejs.dev/)**: Ferramenta de formatação e linting de código.
- **[TypeScript](https://www.typescriptlang.org/)**: JavaScript com tipagem estática.
- **[Tsup](https://github.com/egoist/tsup)**: Empacotador de TypeScript.

## 📁 Estrutura do Projeto <a name="estrutura-do-projeto-pt"></a>

```
├── src
│ ├── drizzle (/migrations, /schema, client.ts)
│ ├── functions: contém arquivos de funções exportadas
│ │ ├── redis (client.ts)
│ ├── routes: contém todas as rotas da aplicação
│ ├── server.ts: inicializa a aplicação
│ ├── env.ts: valida variáveis de ambiente com Zod
├── .env.example: arquivo de exemplo para variáveis de ambiente
```

## 🛠️ Instalação <a name="instalacao-pt"></a>

1. Clone o repositório:
```bash
git clone https://github.com/Vitinho163/DevStage-Backend.git
```

2. Instale as dependências:
```bash
npm install
```

3. Renomeie `.env.example` para `.env` e preencha as informações:
```bash
PORT=3333

# URLs

WEB_URL="http://localhost:3000"

# Database

POSTGRES_URL="postgresql://docker:docker@localhost:5432/connect"
POSTGRES_REPLICA_URL="postgresql://docker:docker@localhost:5433/connect"
REDIS_URL="redis://localhost:6379"

# OpenAI

OPENAI_API_KEY="SUA_KEY"
```

4. Inicie os contêineres Docker para o banco de dados e Redis:
```bash
docker compose up -d
```

5. Execute a migração do banco de dados:
```bash
npm run db:migrate
```

6. Inicie o servidor:
```bash
npm run dev
```

## 💻 Deploy <a name="deploy-pt"></a>

O back-end deste projeto está hospedado no Render e pode ser acessado em:
```
https://devstage-backend.onrender.com/docs
```

> Nota: A aplicação pode demorar para responder caso esteja inativa devido às limitações do plano gratuito do Render.

## 🔗 Frontend <a name="frontend-pt"></a>
Confira o front-end do projeto aqui:
```
https://github.com/Vitinho163/DevStage-Frontend
```

<div align="center" name="autor-pt">
  <h4>Criado com ❤️ por <a href="https://github.com/Vitinho163">João Victor</a></h4>
</div>

# API REST de Biblioteca

API REST desenvolvida em Node.js, Express, Prisma e SQLite para gerenciar autores e livros. O projeto permite criar autores, cadastrar livros e vincular cada livro a um autor.

## Sobre o projeto

Esta API foi organizada com uma arquitetura em camadas, separando responsabilidades entre rotas, controllers, services, repositories, models, middlewares e configuração de banco de dados.

O SQLite foi escolhido por ser leve, simples de configurar e prático para desenvolvimento local. Como o acesso ao banco está concentrado no Prisma, a adaptação para bancos maiores, como PostgreSQL, tende a ser direta: em geral, basta ajustar o `provider`, a `DATABASE_URL` e aplicar novamente o schema.

## Tecnologias

- Node.js
- Express
- Prisma
- SQLite
- CORS
- Dotenv
- Nodemon
- Vitest
- Supertest

## Estrutura de pastas

```text
.
+-- database/
|   +-- prisma.js
+-- postman/
|   +-- library-api.postman_collection.json
+-- prisma/
|   +-- schema.prisma
+-- src/
|   +-- controllers/
|   +-- errors/
|   +-- middlewares/
|   +-- models/
|   +-- repositories/
|   +-- routes/
|   +-- services/
|   +-- app.js
+-- tests/
+-- index.js
+-- package.json
+-- prisma.config.ts
+-- README.md
```

## Arquitetura

- `src/app.js`: configura o Express, middlewares, rota raiz e rotas da API.
- `index.js`: inicia o servidor HTTP.
- `routes`: define os caminhos HTTP e conecta cada rota ao controller correspondente.
- `controllers`: recebe as requisições, chama os services e retorna as respostas HTTP.
- `services`: concentra regras de negócio e validações.
- `repositories`: isola o acesso ao banco de dados usando Prisma.
- `models`: define classes base de domínio.
- `middlewares`: contém middlewares compartilhados, como tratamento de erros.
- `database`: configura a instância do Prisma Client.
- `prisma`: contém o schema do banco.
- `tests`: contém testes automatizados da aplicação.
- `postman`: contém a collection do Postman para testar a API manualmente.

## Modelos

### Author

Representa um autor.

Campos:

- `id`
- `name`
- `nationality`
- `books`

### Book

Representa um livro.

Campos:

- `id`
- `title`
- `publication_year`
- `author_id`
- `author`

Cada livro pertence a um autor, e a relação usa `onDelete: Cascade`, ou seja, ao remover um autor, seus livros relacionados também são removidos.

## Endpoints

### Geral

```http
GET /
```

### Autores

```http
GET /authors?page=1&limit=10
GET /authors/:id
POST /authors
PUT /authors/:id
DELETE /authors/:id
```

Exemplo de criação de autor:

```json
{
  "name": "Machado de Assis",
  "nationality": "Brasileira"
}
```

### Livros

```http
GET /books?page=1&limit=10
GET /books/:id
POST /books
PUT /books/:id
DELETE /books/:id
```

Exemplo de criação de livro:

```json
{
  "title": "Dom Casmurro",
  "publication_year": 1899,
  "author_id": 1
}
```

## Paginação

As rotas de listagem aceitam os parâmetros `page` e `limit`.

Exemplo:

```http
GET /authors?page=1&limit=10
```

Formato da resposta:

```json
{
  "data": [],
  "meta": {
    "page": 1,
    "limit": 10,
    "total": 0,
    "totalPages": 0
  }
}
```

## Configuração inicial

### 1. Instale as dependências

```bash
npm install
```

### 2. Crie o arquivo de ambiente

Crie uma cópia do arquivo `.env.sample` com o nome `.env`.

```bash
cp .env.sample .env
```

No Windows PowerShell:

```powershell
Copy-Item .env.sample .env
```

O projeto usa a variável:

```env
DATABASE_URL="file:./dev.db"
```

### 3. Gere o Prisma Client

```bash
npx prisma generate
```

### 4. Sincronize o banco com o schema

```bash
npx prisma db push
```

### 5. Execute o projeto

Modo desenvolvimento:

```bash
npm run dev
```

Modo produção/local simples:

```bash
npm start
```

Por padrão, a API sobe em:

```text
http://localhost:5000
```

## Configuração do frontend

O frontend fica na pasta `frontend` e usa Vite com Tailwind CSS.

### 1. Entre na pasta do frontend

```bash
cd frontend
```

### 2. Instale as dependências

```bash
npm install
```

### 3. Configure a URL da API

Crie uma cópia do arquivo `.env.sample` com o nome `.env`.

```bash
cp .env.sample .env
```

No Windows PowerShell:

```powershell
Copy-Item .env.sample .env
```

Por padrão, o frontend usa:

```env
VITE_API_URL="http://localhost:5000"
```

### 4. Suba o servidor de desenvolvimento

```bash
npm run dev
```

O Vite exibirá no terminal a URL local do frontend, normalmente:

```text
http://localhost:5173
```

### 5. Compile o frontend

```bash
npm run build
```

Os arquivos compilados serão gerados na pasta `frontend/dist`.

### 6. Visualize a versão compilada

```bash
npm run preview
```

## Scripts disponíveis

### Backend

```bash
npm run dev
npm start
npm run prisma:generate
npm run db:push
npm run setup
npm test
npm run test:watch
```

### Frontend

```bash
npm run dev
npm run build
npm run preview
```

## Testes automatizados

O projeto usa Vitest e Supertest para validar partes importantes da aplicação.

Para executar os testes:

```bash
npm test
```

Atualmente há testes para:

- rota raiz da API;
- paginação no repository;
- tratamento de erros da aplicação e do Prisma.

## Collection do Postman

A collection está disponível em:

```text
postman/library-api.postman_collection.json
```

Para usar:

1. Abra o Postman.
2. Clique em `Import`.
3. Selecione o arquivo `postman/library-api.postman_collection.json`.
4. Inicie a API com `npm run dev` ou `npm start`.
5. Execute as requisições da collection.

A collection possui a variável `base_url` configurada como:

```text
http://localhost:5000
```

Ela também usa as variáveis `author_id` e `book_id`. Ao criar um autor ou livro, os scripts da própria collection salvam automaticamente os IDs retornados para facilitar os testes das rotas de busca, atualização e remoção.

Fluxo recomendado para testar manualmente:

1. `Verificar API`
2. `Criar autor`
3. `Listar autores`
4. `Buscar autor por ID`
5. `Atualizar autor`
6. `Criar livro`
7. `Listar livros`
8. `Buscar livro por ID`
9. `Atualizar livro`
10. `Remover livro`
11. `Remover autor`

## Tratamento de erros

A API possui um middleware centralizado de erros. Além dos erros próprios da aplicação, alguns erros conhecidos do Prisma são convertidos para respostas HTTP mais claras:

- `P2002`: conflito por valor duplicado.
- `P2003`: erro de relacionamento ou chave estrangeira.
- `P2025`: recurso não encontrado.

## Observações de implementação

O projeto usa classes base abstratas para reduzir repetição em controllers, services, repositories e rotas. Essa abordagem deixa clara a intenção de reaproveitar comportamento comum entre recursos da API.

O `src/app.js` concentra a configuração do Express, enquanto o `index.js` apenas inicia o servidor. Essa separação facilita os testes automatizados, já que o app pode ser importado sem abrir uma porta HTTP.

## Licença

ISC

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

## Estrutura de pastas

```text
.
+-- database/
|   +-- prisma.js
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
+-- index.js
+-- package.json
+-- prisma.config.ts
+-- README.md
```

## Arquitetura

- `routes`: define os caminhos HTTP e conecta cada rota ao controller correspondente.
- `controllers`: recebe as requisições, chama os services e retorna as respostas HTTP.
- `services`: concentra regras de negócio e validações.
- `repositories`: isola o acesso ao banco de dados usando Prisma.
- `models`: define classes base de domínio.
- `middlewares`: contém middlewares compartilhados, como tratamento de erros.
- `database`: configura a instância do Prisma Client.
- `prisma`: contém o schema do banco.

## Modelos

### Author

Representa um autor.

Campos:

- `id`
- `name`
- `nationality`

### Book

Representa um livro.

Campos:

- `id`
- `title`
- `publication_year`
- `author_id`

Cada livro pertence a um autor, e a relação usa `onDelete: Cascade`, ou seja, ao remover um autor, seus livros relacionados também são removidos.

## Endpoints

### Autores

```http
GET /authors
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
GET /books
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

## Observações de implementação

O projeto usa classes base abstratas para reduzir repetição em controllers, services, repositories e rotas. Essa abordagem deixa clara a intenção de reaproveitar comportamento comum entre recursos da API.

Também há um middleware centralizado de erros, o que ajuda a padronizar respostas quando uma validação ou exceção acontece.

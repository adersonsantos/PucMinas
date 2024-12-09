
# Trabalho Final: Desenvolvimento de API REST com Node.js

O objetivo deste trabalho é aplicar os conceitos aprendidos ao longo da disciplina para criar uma API REST completa utilizando Node.js. O aluno poderá escolher o tema da API, bem como os frameworks e bibliotecas que desejar, mas deve seguir os requisitos estabelecidos para garantir o funcionamento adequado e a qualidade do projeto.

# API REST Node.js com SQLite

## Como rodar localmente

1. Clone o repositório:
git clone https://github.com/adersonsantos/my-api-project.git

2. Instale as dependências:
npm install express sqlite3
npm install --save-dev jest supertest
npm install --save-dev nodemon

3. Rodando a API:
npm start

A API estará rodando em `http://localhost:3000`.

## Rotas

- `POST /api/items`: Cria um novo item.
- `GET /api/items`: Lista todos os itens.
- `PUT /api/items/:id`: Atualiza um item existente.
- `DELETE /api/items/:id`: Deleta um item.

## Testes

Para rodar os testes, execute:

npm jest
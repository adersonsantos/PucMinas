# API de Produtos

Esta é uma API REST desenvolvida em Node.js com Sequelize, SQLite, e testes com Jest.

## Como Executar Localmente

1. Clone o repositório:
    ```bash
    git clone https://github.com/usuario/api-produtos.git
    cd api-produtos
    ```

2. Instale as dependências:
    ```bash
    npm install
    ```

3. Execute a API:
    ```bash
    npm start
    ```

4. A API estará disponível em `http://localhost:3000`.

## Endpoints

- `GET /api/produtos`: Lista todos os produtos.
- `POST /api/produtos`: Cria um novo produto.
- `PUT /api/produtos/:id`: Atualiza um produto.
- `DELETE /api/produtos/:id`: Deleta um produto.

## Testes

Para rodar os testes, use o comando:

```bash
npm test

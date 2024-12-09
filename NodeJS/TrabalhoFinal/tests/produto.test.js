const request = require('supertest');
const app = require('../app');

describe('Testes de API de Produtos', () => {
  let produtoId;

  it('Deve criar um novo produto', async () => {
    const response = await request(app)
      .post('/api/produtos')
      .send({
        nome: 'Produto 1',
        preco: 100.0,
        descricao: 'Descrição do Produto 1',
      });
    expect(response.status).toBe(201);
    expect(response.body.nome).toBe('Produto 1');
    produtoId = response.body.id;
  });

  it('Deve listar todos os produtos', async () => {
    const response = await request(app).get('/api/produtos');
    expect(response.status).toBe(200);
    expect(response.body.length).toBeGreaterThan(0);
  });

  it('Deve atualizar um produto', async () => {
    const response = await request(app)
      .put(`/api/produtos/${produtoId}`)
      .send({ nome: 'Produto Atualizado' });
    expect(response.status).toBe(200);
    expect(response.body.nome).toBe('Produto Atualizado');
  });

  it('Deve deletar um produto', async () => {
    const response = await request(app).delete(`/api/produtos/${produtoId}`);
    expect(response.status).toBe(204);
  });
});

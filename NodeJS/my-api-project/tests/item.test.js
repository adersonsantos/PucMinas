const request = require('supertest');
const app = require('../src/app');
const db = require('../src/db/database');

beforeAll(() => {
    run("CREATE TABLE IF NOT EXISTS items (id INTEGER PRIMARY KEY, name TEXT, description TEXT)");
});

afterAll(() => {
    close();
});

describe('API Tests', () => {
    test('POST /api/items creates an item', async () => {
        const response = await request(app)
            .post('/api/items')
            .send({ name: 'Item 1', description: 'Test item' });
        
        expect(response.status).toBe(201);
        expect(response.body).toHaveProperty('id');
    });

    test('GET /api/items returns all items', async () => {
        const response = await request(app).get('/api/items');
        expect(response.status).toBe(200);
        expect(Array.isArray(response.body)).toBe(true);
    });
});
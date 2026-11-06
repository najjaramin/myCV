const request = require('supertest');

// --- MOCKS (lazem yكونou 9bal require('./server')) ---
const mockCreate = jest.fn();

jest.mock('@prisma/client', () => ({
  PrismaClient: jest.fn().mockImplementation(() => ({
    contactMessage: { create: mockCreate },
  })),
}));

jest.mock('@prisma/adapter-pg', () => ({
  PrismaPg: jest.fn(),
}));

const app = require('./server');

describe('API Portfolio', () => {
  beforeEach(() => {
    mockCreate.mockClear();
    mockCreate.mockResolvedValue({ id: 1 });
  });

  test('GET /api/health doit retourner 200 OK', async () => {
    const res = await request(app).get('/api/health');
    expect(res.statusCode).toBe(200);
    expect(res.body.status).toBe('OK');
  });

  test('POST /api/contact doit accepter les données valides', async () => {
    const res = await request(app)
      .post('/api/contact')
      .send({
        name: 'Test',
        email: 'test@example.com',
        message: 'Ceci est un message de test valide.',
      });
    expect(res.statusCode).toBe(201);
    expect(res.body.success).toBe(true);
    expect(res.body.id).toBe(1);
    expect(mockCreate).toHaveBeenCalledTimes(1);
  });

  test('POST /api/contact doit rejeter les données invalides', async () => {
    const res = await request(app)
      .post('/api/contact')
      .send({ name: 'A', email: 'pas-un-email', message: 'court' });
    expect(res.statusCode).toBe(400);
    expect(res.body.error).toBe('Données invalides');
    expect(res.body.details.length).toBeGreaterThan(0);
    expect(mockCreate).not.toHaveBeenCalled();
  });

  test('POST /api/contact doit traiter une injection SQL comme du texte', async () => {
    const payload = "Amin'; DROP TABLE \"ContactMessage\";--";
    const res = await request(app)
      .post('/api/contact')
      .send({
        name: payload,
        email: 'test@example.com',
        message: 'Test injection SQL',
      });
    expect(res.statusCode).toBe(201);
    expect(mockCreate).toHaveBeenCalledWith({
      data: expect.objectContaining({ name: payload }),
    });
  });

  // Ce test doit rester le DERNIER: les 3 POST précédents comptent déjà (limite = 5 / 15 min)
  test('POST /api/contact doit appliquer le rate limiting', async () => {
    const body = {
      name: 'Test',
      email: 'test@example.com',
      message: 'Ceci est un message de test valide.',
    };
    await request(app).post('/api/contact').send(body); // 4e
    await request(app).post('/api/contact').send(body); // 5e
    const res = await request(app).post('/api/contact').send(body); // 6e
    expect(res.statusCode).toBe(429);
  });
});

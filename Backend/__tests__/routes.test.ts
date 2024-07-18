// __tests__/routes.test.ts
import request from 'supertest';
import app from '../src/app'; // Adjust the path as necessary
import { Stock } from '../src/models/Stock';

jest.mock('../src/models/Stock');

describe('Express API Routes', () => {
  describe('GET /healthCheck', () => {
    it('should return UP', async () => {
      const res = await request(app).get('/api/v1/healthCheck');
      expect(res.statusCode).toEqual(200);
      expect(res.text).toBe('UP');
    });
  });

  describe('GET /api/v1/stocks', () => {
    beforeEach(() => {
      (Stock.find as jest.Mock).mockClear();
    });

    it('should return stocks when a valid code is provided', async () => {
      const mockStocks = [
        { _id: '1', code: 'SOL', rate: 156.2183756684363, createdat: new Date() },
        { _id: '2', code: 'SOL', rate: 156.2183756684363, createdat: new Date() },
      ];

      (Stock.find as jest.Mock).mockReturnValue({
        sort: jest.fn().mockReturnThis(),
        limit: jest.fn().mockReturnThis(),
        exec: jest.fn().mockResolvedValue(mockStocks),
      });

      const res = await request(app).get('/api/v1/stocks?code=SOL');
      expect(res.statusCode).toEqual(200);
      expect(res.body).toBeInstanceOf(Array);
      expect(res.body).toHaveLength(2);
    });

    it('should handle errors properly', async () => {
      (Stock.find as jest.Mock).mockReturnValue({
        sort: jest.fn().mockReturnThis(),
        limit: jest.fn().mockReturnThis(),
        exec: jest.fn().mockRejectedValue(new Error('Test error')),
      });

      const res = await request(app).get('/api/v1/stocks?code=SOL');
      expect(res.statusCode).toEqual(500); // Assuming you handle the error by sending a 500 status
      expect(res.body).toEqual({ error: 'Something went wrong' }); // Update this to match your actual error response
    });
  });
});

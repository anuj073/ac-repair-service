import { test, expect } from '@playwright/test';

const API_URL = process.env.API_URL || 'http://localhost:5000';

test.describe('API Health', () => {
  test('health endpoint responds', async ({ request }) => {
    const resp = await request.get(`${API_URL}/api/health`);
    expect(resp.ok()).toBeTruthy();
    const data = await resp.json();
    expect(data.success).toBe(true);
  });
});

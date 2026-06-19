import { expect, test } from '@playwright/test';
import { connect, deleteMany, disconnect, insertMany } from '../../utils/mongodb';

const API_BASE_URL = 'http://localhost:4069';
const deleteMarker = 'TestSearchActivities';

async function seedTestData(): Promise<void> {
  const baseDate = new Date();
  baseDate.setUTCHours(12, 0, 0, 0);

  const activities = [
    {
      content: `Morning jog ${deleteMarker}`,
      tags: ['exercise', 'health'],
      time: new Date(baseDate),
      income: 0,
      outcome: 0,
    },
    {
      content: `Freelance project ${deleteMarker}`,
      tags: ['work', 'income'],
      time: new Date(baseDate),
      income: 500,
      outcome: 0,
    },
    {
      content: `Lunch with client ${deleteMarker}`,
      tags: ['work', 'food'],
      time: new Date(baseDate),
      income: 100,
      outcome: 30,
    },
  ];

  await insertMany('activities', activities);
  console.log(`Seeded ${activities.length.toString()} test activities`);
}

async function cleanupTestData(): Promise<void> {
  const deletedCount = await deleteMany('activities', {
    content: { $regex: deleteMarker },
  });
  console.log(`Cleaned up ${deletedCount.toString()} test activities`);
}

test.beforeAll(async () => {
  await connect();
  await seedTestData();
});

test.afterAll(async () => {
  await cleanupTestData();
  await disconnect();
});

test.describe('Search Activities API', () => {
  test('TC_SA_01: should return activities matching the search text', async ({
    request,
  }) => {
    const response = await request.get(`${API_BASE_URL}/diary/activities`, {
      params: { text: deleteMarker, limit: 10, offset: 0 },
    });

    expect(response.ok()).toBeTruthy();

    const totalCount = response.headers()['x-total-count'];
    expect(Number(totalCount)).toBe(3);

    const activities = (await response.json()) as { content: string }[];
    expect(activities).toHaveLength(3);

    for (const activity of activities) {
      expect(activity.content).toContain(deleteMarker);
    }
  });
});

import { http, HttpResponse } from 'msw';

const DELAY = 500;

async function delay(ms: number = DELAY): Promise<void> {
  return new Promise((resolve) => setTimeout(resolve, ms));
}

export const handlers = [
  http.get('/api/diary/tags', async () => {
    await delay();
    return HttpResponse.json(['play', 'nec', 'household']);
  }),

  http.get('/api/diary/stat/revenue', async () => {
    await delay();
    return HttpResponse.json({ income: 59272, outcome: 8167 });
  }),

  http.get('/api/diary/activities', async () => {
    await delay();
    const headers = new Headers();
    headers.set('x-total-count', '52');
    return HttpResponse.json(
      [
        {
          tags: ['play', 'gog'],
          id: '67a1e84a6478d200176a6fa3',
          content:
            'Lorem ipsum dolor sit amet\nconsectetur adipiscing elit\nmagnam aliquam quaerat voluptatem',
          time: '2025-02-04T10:12:57.687Z',
          outcome: 225,
        },
        {
          tags: ['nec'],
          id: '67a1cc4a7754780017ae2740',
          content: 'Nemo enim ipsam voluptatem',
          time: '2025-02-04T08:07:10.309Z',
          outcome: 69,
        },
        {
          tags: [],
          id: '67a1cc257754780017ae273f',
          content: 'Lorem ipsum dolor sit amet',
          time: '2025-02-02T08:07:10.000Z',
        },
        {
          tags: [],
          id: '67a1cbb37754780017ae273e',
          content:
            'At vero eos et accusamus et iusto odio dignissimos\nut aut reiciendis voluptatibus ',
          time: '2025-02-01T01:00:10.000Z',
        },
      ],
      { headers },
    );
  }),

  http.post('/api/diary/activities', async () => {
    await delay();
    return HttpResponse.json({
      tags: ['play', 'gog'],
      id: '67a1e84a6478d200176a6fa3',
      content:
        'Lorem ipsum dolor sit amet\nconsectetur adipiscing elit\nmagnam aliquam quaerat voluptatem',
      time: '2025-02-04T10:12:57.687Z',
      outcome: 225,
    });
  }),

  http.put('/api/diary/activities/:id', async ({ params }) => {
    const { id } = params;
    await delay();
    return HttpResponse.json({
      tags: ['play', 'gog'],
      id: id,
      content:
        'Lorem ipsum dolor sit amet\nconsectetur adipiscing elit\nmagnam aliquam quaerat voluptatem',
      time: '2025-02-04T10:12:57.687Z',
      outcome: 225,
    });
  }),

  http.get('/api/diary/activities/:id', async ({ params }) => {
    const { id } = params;
    await delay();
    return HttpResponse.json({
      tags: ['play', 'gog'],
      id: id,
      content:
        'Lorem ipsum dolor sit amet\nconsectetur adipiscing elit\nmagnam aliquam quaerat voluptatem',
      time: '2025-02-04T10:12:57',
      outcome: 225,
    });
  }),

  http.delete('/api/diary/activities/:id', async () => {
    await delay();
    return new HttpResponse();
  }),
];

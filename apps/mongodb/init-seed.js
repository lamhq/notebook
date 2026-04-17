// Switch to the test database
db = db.getSiblingDB('test');

// Create activities collection with sample data
// 30 records: 20 from current date to past, 10 from future
const activities = [];
const currentDate = new Date();
currentDate.setUTCHours(0, 0, 0, 0);
const activityTemplates = [
  {
    content: 'Morning jog',
    tags: ['exercise', 'health'],
    outcome: 50,
  },
  {
    content: 'Freelance project',
    tags: ['work', 'income'],
    income: 500,
  },
  { content: 'Lunch with client', tags: ['work', 'food'], income: 100, outcome: 30 },
  {
    content: 'Evening coding',
    tags: ['work', 'learning'],
  },
  {
    content: 'Gym session',
    tags: ['exercise', 'health'],
    outcome: 40,
  },
  {
    content: 'Consulting call',
    tags: ['work', 'income'],
    income: 300,
  },
  { content: 'Movie night', tags: ['entertainment'], outcome: 20 },
  { content: 'Yoga class', tags: ['exercise', 'health'], outcome: 35 },
  {
    content: 'Team meeting',
    tags: ['work', 'learning'],
  },
  { content: 'Dinner out', tags: ['food', 'social'], outcome: 45 },
];

// Generate 20 records going back from current date
for (let i = 0; i < 20; i++) {
  const date = new Date(currentDate);
  date.setDate(date.getDate() - i);
  const template = activityTemplates[i % activityTemplates.length];
  activities.push({
    _id: ObjectId(),
    content: template.content,
    time: date,
    tags: template.tags,
    income: template.income,
    outcome: template.outcome,
  });
}

// Generate 10 records going forward from current date
for (let i = 1; i <= 10; i++) {
  const date = new Date(currentDate);
  date.setDate(date.getDate() + i);
  const template = activityTemplates[(20 + i) % activityTemplates.length];
  activities.push({
    _id: ObjectId(),
    content: template.content,
    time: date,
    tags: template.tags,
    income: template.income,
    outcome: template.outcome,
  });
}

db.activities.insertMany(activities);

// Create indexes on activities collection
db.activities.createIndex({ time: -1 });
db.activities.createIndex({ tags: 1 });
db.activities.createIndex({ content: 'text' });

// Create tags collection with sample data
db.tags.insertMany([
  {
    _id: ObjectId(),
    name: 'exercise',
  },
  {
    _id: ObjectId(),
    name: 'health',
  },
  {
    _id: ObjectId(),
    name: 'work',
  },
  {
    _id: ObjectId(),
    name: 'income',
  },
  {
    _id: ObjectId(),
    name: 'food',
  },
  {
    _id: ObjectId(),
    name: 'learning',
  },
]);

// Create index on tags collection
db.tags.createIndex({ name: 1 });

print('Seed data initialized successfully');

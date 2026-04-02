// Switch to the test database
db = db.getSiblingDB('test');

// Create activities collection with sample data
db.activities.insertMany([
  {
    _id: ObjectId(),
    content: 'Morning jog',
    time: new Date('2024-04-01T07:00:00Z'),
    tags: ['exercise', 'health'],
    income: null,
    outcome: 50,
  },
  {
    _id: ObjectId(),
    content: 'Freelance project',
    time: new Date('2024-04-01T14:00:00Z'),
    tags: ['work', 'income'],
    income: 500,
  },
  {
    _id: ObjectId(),
    content: 'Lunch with client',
    time: new Date('2024-04-01T12:00:00Z'),
    tags: ['work', 'food'],
    income: 100,
    outcome: 30,
  },
  {
    _id: ObjectId(),
    content: 'Evening coding',
    time: new Date('2024-04-01T19:00:00Z'),
    tags: ['work', 'learning'],
  },
]);

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

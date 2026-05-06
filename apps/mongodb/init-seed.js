// Switch to the test database
db = db.getSiblingDB('test');

// Create activities collection with sample data
// 50+ records with varied times on same dates for comprehensive pagination and sorting tests
const activities = [];
const currentDate = new Date();
currentDate.setUTCHours(0, 0, 0, 0);

const activityTemplates = [
  {
    content: 'Morning jog',
    tags: ['exercise', 'health', 'nec'],
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
    tags: ['work', 'learning', 'household'],
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
  { content: 'Movie night', tags: ['entertainment', 'nec'], outcome: 20 },
  { content: 'Yoga class', tags: ['exercise', 'health', 'household'], outcome: 35 },
  {
    content: 'Team meeting',
    tags: ['work', 'learning'],
  },
  { content: 'Dinner out', tags: ['food', 'social'], outcome: 45 },
  { content: 'Grocery shopping', tags: ['household', 'nec'], outcome: 75 },
  { content: 'Project delivery', tags: ['work', 'income'], income: 1200 },
  { content: 'Coffee meeting', tags: ['work', 'social'], outcome: 12 },
  {
    content: 'Weekend hike',
    tags: ['exercise', 'health', 'entertainment'],
    outcome: 0,
  },
  { content: 'Client payment received', tags: ['income', 'work'], income: 800 },
  { content: 'Home repair', tags: ['household', 'nec'], outcome: 200 },
  { content: 'Doctor appointment', tags: ['health', 'nec'], outcome: 150 },
  {
    content: 'Birthday dinner',
    tags: ['food', 'social', 'entertainment'],
    outcome: 85,
  },
  { content: 'Online course', tags: ['learning', 'work'], outcome: 99 },
  { content: 'Car maintenance', tags: ['household', 'nec'], outcome: 300 },
];

// Helper function to create activities with varied times on the same date
function addActivitiesToDate(baseDate, count, startHour = 8) {
  const dayActivities = [];
  for (let i = 0; i < count; i++) {
    const time = new Date(baseDate);
    const hour = startHour + i * 2; // Space activities 2 hours apart
    const minute = (i % 3) * 20; // Vary minutes: 0, 20, 40
    time.setUTCHours(hour % 24, minute, 0, 0);

    const template =
      activityTemplates[(baseDate.getDate() + i) % activityTemplates.length];
    dayActivities.push({
      _id: ObjectId(),
      content: template.content,
      time: time,
      tags: template.tags,
      income: template.income,
      outcome: template.outcome,
    });
  }
  return dayActivities;
}

// Generate activities for past dates (5 days back from current date)
// Including multiple activities per day for sorting tests
for (let i = 0; i < 5; i++) {
  const date = new Date(currentDate);
  date.setDate(date.getDate() - i);

  // Add 2-3 activities per day to test same-date sorting
  const activitiesPerDay = i % 2 === 0 ? 3 : 2;
  const dayActivities = addActivitiesToDate(date, activitiesPerDay);
  activities.push(...dayActivities);
}

// Generate activities for future dates (5 days forward from current date)
for (let i = 1; i <= 5; i++) {
  const date = new Date(currentDate);
  date.setDate(date.getDate() + i);

  // Add 2-3 activities per day
  const activitiesPerDay = i % 2 === 0 ? 3 : 2;
  const dayActivities = addActivitiesToDate(date, activitiesPerDay);
  activities.push(...dayActivities);
}

// Sort activities by date (newest first) and time (newest first within same date)
activities.sort((a, b) => b.time - a.time);

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
  {
    _id: ObjectId(),
    name: 'entertainment',
  },
  {
    _id: ObjectId(),
    name: 'social',
  },
  {
    _id: ObjectId(),
    name: 'nec',
  },
  {
    _id: ObjectId(),
    name: 'household',
  },
]);

// Create index on tags collection
db.tags.createIndex({ name: 1 });

print('Seed data initialized successfully');

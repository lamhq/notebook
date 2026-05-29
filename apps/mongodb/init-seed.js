// Switch to the test database
db = db.getSiblingDB('test');

// Create indexes on activities collection
db.activities.createIndex({ time: -1 });
db.activities.createIndex({ tags: 1 });
db.activities.createIndex({ content: 'text' });

// Create index on tags collection
db.tags.createIndex({ name: 1 });

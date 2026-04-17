# MongoDB Initialization

This folder contains the seed scripts for MongoDB initialization during container startup.

## Contents

- `init-seed.js` - MongoDB initialization script that creates collections with sample data and indexes

## How It Works

When the MongoDB container starts, all JavaScript files in this directory are executed automatically. The `init-seed.js` script:

1. Switches to the `test` database
2. Creates the `activities` collection with sample diary entries
3. Creates the `tags` collection with predefined tags
4. Sets up indexes on frequently queried fields for better performance

## Collections

### activities

Contains diary activity entries with:

- `content`: Activity description
- `time`: Timestamp of the activity
- `tags`: Array of associated tags
- `income`: Optional income amount
- `outcome`: Optional expense amount

### tags

Contains available tags:

- `name`: Tag name (e.g., 'exercise', 'work', 'food')

## Sample Data

The initialization includes sample activities and tags for testing purposes. Modify `init-seed.js` to change the initial data.

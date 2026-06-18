import { getNestApp } from './app';

console.log('DB_URI:', process.env.DB_URI);

if (!process.env.DB_URI) {
  throw new Error('Missing required environment variable: DB_URI');
}

async function bootstrap() {
  const app = await getNestApp();
  await app.listen(4069);
}

bootstrap().catch((error: unknown) => {
  console.error('Unhandled error during bootstrap:', error);
});

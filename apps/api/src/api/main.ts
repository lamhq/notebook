import { getNestApp } from './app';

async function bootstrap() {
  const app = await getNestApp();

  await app.listen(4069);
}

bootstrap().catch((error: unknown) => {
  console.error('Unhandled error during bootstrap:', error);
});

import { build } from 'esbuild';
import { clean } from 'esbuild-plugin-clean';
import { esbuildPluginDecorator } from 'esbuild-plugin-decorator';

await build({
  entryPoints: ['src/api/lambda.ts'],
  outdir: 'dist',
  sourcemap: true,
  platform: 'node',
  target: 'node22',
  bundle: true,
  minify: true,
  external: [
    '@nestjs/microservices',
    '@nestjs/websockets/socket-module',
    'class-transformer/storage',
    '@aws-sdk/client-s3',
    '@mdpdf/mdpdf-darwin-arm64',
    '@mdpdf/mdpdf-darwin-x64',
    '@mdpdf/mdpdf-linux-arm64',
    '@mdpdf/mdpdf-linux-x64',
    '@mdpdf/mdpdf-linux-x64-gnu',
    '@mdpdf/mdpdf-win32-arm64.exe',
    '@mdpdf/mdpdf-win32-x64.exe',
  ],
  plugins: [
    esbuildPluginDecorator({
      tsconfigPath: 'tsconfig.json',
    }),
    clean({
      patterns: ['./dist/*'],
    }),
  ],
});

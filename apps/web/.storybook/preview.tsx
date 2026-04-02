import type { Preview } from '@storybook/react-vite';
import { initialize, mswLoader } from 'msw-storybook-addon';
import { handlers } from '../src/msw/handlers';
import '../src/styles.css';
import MockProvider from './MockProvider';

// Initialize Mock Service Worker
initialize();

const preview: Preview = {
  parameters: {
    // layout: 'fullscreen',
    controls: {
      matchers: {
        color: /(background|color)$/i,
        date: /Date$/i,
      },
    },
    msw: {
      handlers,
    },
  },
  decorators: [
    (Story) => (
      <MockProvider>
        <Story />
      </MockProvider>
    ),
  ],
  loaders: [mswLoader],
};

export default preview;

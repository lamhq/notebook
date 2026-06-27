import { useToast } from '../toast';

export default function useErrorHandler() {
  const { showError } = useToast();
  return (error: unknown) => {
    if (error instanceof Error) {
      showError(error.message);
    } else {
      console.error('Unexpected error', error);
    }
  };
}

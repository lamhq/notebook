import { useDialogs } from '../dialog';

export default function useErrorHandler() {
  const { alert } = useDialogs();
  return (error: unknown) => {
    if (error instanceof Error) {
      alert(error.message, { title: 'Error', severity: 'error' }).catch(
        console.error,
      );
    } else {
      console.error('Unexpected error', error);
    }
  };
}

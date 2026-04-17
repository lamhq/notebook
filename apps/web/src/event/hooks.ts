import { useContext } from 'react';
import { EventContext } from './contexts';

export function useEvent() {
  const ev = useContext(EventContext);
  if (!ev) {
    throw new Error('EventProvider is missing in the component tree');
  }
  return ev;
}

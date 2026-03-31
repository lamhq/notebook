import type EventEmitter from 'eventemitter3';
import type { ReactNode } from 'react';
import { EventContext } from './contexts';

type EventProviderProps = {
  emitter: EventEmitter;
  children: ReactNode;
};

export default function EventProvider({ emitter, children }: EventProviderProps) {
  return <EventContext.Provider value={emitter}>{children}</EventContext.Provider>;
}

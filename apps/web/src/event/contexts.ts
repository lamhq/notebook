import type EventEmitter from 'eventemitter3';
import { createContext } from 'react';

export const EventContext = createContext<EventEmitter | undefined>(undefined);

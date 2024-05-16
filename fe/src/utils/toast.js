import EventManager from '../lib/EventManager';

export const toatsEventManager = new EventManager();

export default function toast({ type, text, duration }) {
  toatsEventManager.emit('addtoast', { type, text, duration });
}

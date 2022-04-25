export function on(
  target: EventTarget,
  type: string,
  listener: EventListenerOrEventListenerObject,
  options: boolean | AddEventListenerOptions
): EventListenerRemover;
export function once(
  target: EventTarget,
  type: string,
  listener: EventListenerOrEventListenerObject
): EventListenerRemover;
export function emit(target: EventTarget, type: string, detail?: any): boolean;
export type EventListenerRemover = () => void;
//# sourceMappingURL=events.d.ts.map

export function createScrollWatcher(
  options?: ScrollWatcherOptions | undefined
): {
  onScrollStart: ScrollCallback | null;
  onScrollEnd: ScrollCallback | null;
  onScroll: ScrollCallback | null;
  destroy(): void;
};
export const DEFAULTS: ScrollWatcherOptions;
export default createScrollWatcher;
export type ScrollInfo = {
  value: number;
  timeStamp: number;
  diff?: number | undefined;
  distance?: number | undefined;
  timeElapsed?: number | undefined;
};
export type ScrollCallback = (scrollInfo: ScrollInfo) => void;
export type ScrollCallbackOrScrollCallbacks = ScrollCallback | ScrollCallback[];
export type ScrollTarget = Window | Element;
export type ScrollAxis = "x" | "y";
export type ScrollWatcherOptions = {
  target: ScrollTarget;
  threshold: number;
  axis: ScrollAxis;
  onScrollStart?: ScrollCallbackOrScrollCallbacks | undefined;
  onScrollEnd?: ScrollCallbackOrScrollCallbacks | undefined;
  onScroll?: ScrollCallbackOrScrollCallbacks | undefined;
};
//# sourceMappingURL=index.d.ts.map

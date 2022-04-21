export function setup({
  target,
  threshold,
  axis,
  onScrollStart,
  onScroll,
  onScrollEnd,
}?: ScrollWatcherOptions): ScrollWatcherCleanup;
export default setup;
export type ScrollInfo = {
  value: number;
  timeStamp: number;
  diff?: number | undefined;
  distance?: number | undefined;
  timeElapsed?: number | undefined;
};
export type ScrollWatcherOptions = {
  target?: Window | Element | undefined;
  threshold?: number | undefined;
  axis?: "x" | "y" | undefined;
  onScrollStart?: ((scroll: ScrollInfo) => void) | undefined;
  onScroll?: ((scroll: ScrollInfo) => void) | undefined;
  onScrollEnd?: ((scroll: ScrollInfo) => void) | undefined;
};
export type ScrollWatcherCleanup = () => void;
//# sourceMappingURL=index.d.ts.map

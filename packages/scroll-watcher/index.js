import getScrollValueGetter from "./get-scroll-value-getter";

/**
 * @typedef {Object} ScrollInfo
 * @property {number} value
 * @property {number} timeStamp
 * @property {number} distance
 * @property {number} timeElapsed
 *
 * @typedef {Object} ScrollWatcherOptions
 * @property {Window | Element} target
 * @property {number} threshold
 * @property {"x" | "y"} direction
 * @property {(scroll:ScrollInfo) => void} [onScrollStart]
 * @property {(scroll:ScrollInfo) => void} [onScroll]
 * @property {(scroll:ScrollInfo) => void} [onScrollEnd]
 */

/**
 * @param {ScrollWatcherOptions} options
 * @returns {() => void} Cleanup Function
 */
export function setup({
  target = window,
  threshold = 100,
  direction = "y",
  onScrollStart,
  onScroll,
  onScrollEnd,
} = {}) {
  const getScrollValue = getScrollValueGetter(target, direction);

  /** @type {(ScrollInfo | null)} */
  let scrollStart = null;
  /** @type {number} */
  let scrollTimeout = null;

  /** @param {Event} event */
  const listener = (event) => {
    if (scrollTimeout) {
      clearTimeout(scrollTimeout);
    }

    const isScrollStart = scrollStart === null;
    const current = {
      value: getScrollValue(),
      timeStamp: event.timeStamp,
    };

    if (isScrollStart) {
      scrollStart = { ...current };

      if (typeof onScrollStart === "function") {
        onScrollStart(scrollStart);
      }

      const scrollStartEvent = new CustomEvent("scrollstart", {
        detail: scrollStart,
      });
      window.dispatchEvent(scrollStartEvent);
    }

    const scroll = {
      ...current,
      distance: current.value - scrollStart.value,
      timeElapsed: current.timeStamp - scrollStart.timeStamp,
    };

    if (typeof onScroll === "function") {
      onScroll(scroll);
    }

    scrollTimeout = setTimeout(() => {
      scrollTimeout = null;
      scrollStart = null;

      if (typeof onScrollEnd === "function") {
        onScrollEnd(scroll);
      }

      const scrollEndEvent = new CustomEvent("scrollend", { detail: scroll });
      window.dispatchEvent(scrollEndEvent);
    }, threshold);
  };

  window.addEventListener("scroll", listener);

  return () => {
    window.removeEventListener("scroll", listener);
  };
}

export default setup;

/**
 * @typedef {Object} ScrollInfo
 * @property {number} value
 * @property {number} timeStamp
 * @property {number} [diff]
 * @property {number} [distance]
 * @property {number} [timeElapsed]
 *
 * @typedef {Object} ScrollWatcherOptions
 * @property {(Window | Element)} [target=window]
 * @property {number} [threshold=100]
 * @property {("x" | "y")} [axis="y"]
 * @property {(scroll:ScrollInfo) => void} [onScrollStart]
 * @property {(scroll:ScrollInfo) => void} [onScroll]
 * @property {(scroll:ScrollInfo) => void} [onScrollEnd]
 *
 * @typedef {() => void} ScrollWatcherCleanup
 */

/**
 * @param {(Window | Element)} target
 * @param {("x" | "y")} axis
 * @returns {() => number}
 */
function createScrollValueGetter(target = window, axis = "y") {
  let propertyName = `scroll${axis.toUpperCase()}`;

  if (!(propertyName in target)) {
    propertyName = `scroll${axis === "x" ? "Left" : "Top"}`;
  }

  return () => target[propertyName];
}

/**
 * @param {ScrollWatcherOptions} options
 * @returns {ScrollWatcherCleanup}
 */
export function setup({
  target = window,
  threshold = 100,
  axis = "y",
  onScrollStart,
  onScroll,
  onScrollEnd,
} = {}) {
  const getScrollValue = createScrollValueGetter(target, axis);

  /** @type {?ScrollInfo} */
  let start = null;

  /** @type {?ScrollInfo} */
  let previous = null;

  /** @type {number} */
  let distance = 0;

  /** @type {?number} */
  let thresholdTimeout = null;

  /** @param {Event} event */
  const listener = (event) => {
    if (thresholdTimeout) {
      clearTimeout(thresholdTimeout);
    }

    const isStart = start === null;
    const current = {
      value: getScrollValue(),
      timeStamp: event.timeStamp,
    };

    if (isStart) {
      start = { ...current };
      distance = 0;

      if (typeof onScrollStart === "function") {
        onScrollStart(start);
      }

      const scrollStartEvent = new CustomEvent("scrollstart", {
        detail: start,
      });
      window.dispatchEvent(scrollStartEvent);
    } else if (previous) {
      distance += Math.abs(current.value - previous.value);
    } else {
      distance = 0;
    }

    /** @type {ScrollInfo} */
    const scroll = {
      ...current,
      distance,
    };

    if (start) {
      scroll.diff = current.value - start.value;
      scroll.timeElapsed = current.timeStamp - start.timeStamp;
    }

    previous = scroll;

    if (typeof onScroll === "function") {
      onScroll(scroll);
    }

    thresholdTimeout = setTimeout(() => {
      thresholdTimeout = null;
      start = null;
      previous = null;
      distance = 0;

      if (typeof onScrollEnd === "function") {
        onScrollEnd(scroll);
      }

      const scrollEndEvent = new CustomEvent("scrollend", { detail: scroll });
      window.dispatchEvent(scrollEndEvent);
    }, threshold);
  };

  window.addEventListener("scroll", listener);

  /** @type {ScrollWatcherCleanup} */
  const cleanup = () => {
    window.removeEventListener("scroll", listener);
  };

  return cleanup;
}

export default setup;

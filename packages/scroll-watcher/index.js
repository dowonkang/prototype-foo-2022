/**
 * @typedef {Object} ScrollInfo
 * @property {number} value
 * @property {number} timeStamp
 * @property {number} [diff]
 * @property {number} [distance]
 * @property {number} [timeElapsed]
 *
 * @typedef {(scrollInfo:ScrollInfo) => void} ScrollCallback
 * @typedef {(ScrollCallback | ScrollCallback[])} ScrollCallbackOrScrollCallbacks
 * @typedef {(Window | Element)} ScrollTarget
 * @typedef {("x" | "y")} ScrollAxis
 *
 * @typedef {Object} ScrollWatcherOptions
 * @property {ScrollTarget} target
 * @property {number} threshold
 * @property {ScrollAxis} axis
 * @property {ScrollCallbackOrScrollCallbacks} [onScrollStart]
 * @property {ScrollCallbackOrScrollCallbacks} [onScrollEnd]
 * @property {ScrollCallbackOrScrollCallbacks} [onScroll]
 */

/**
 * @param {ScrollTarget} target
 * @param {ScrollAxis} axis
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
 * @param {ScrollTarget} target
 * @param {string} type
 * @param {*} detail
 * @returns {boolean}
 */
function emit(target, type, detail) {
  const event = new CustomEvent(type, { detail });
  return target.dispatchEvent(event);
}

/**
 * @param {ScrollCallbackOrScrollCallbacks} [callbackOrCallbacks]
 */
function createScrollCallbackManager(callbackOrCallbacks) {
  /** @type {Set<ScrollCallback>} */
  const callbacks = new Set();

  /** @param {ScrollCallbackOrScrollCallbacks} callbackOrCallbacks */
  const addCallback = (callbackOrCallbacks) => {
    if (typeof callbackOrCallbacks === "function") {
      callbacks.add(callbackOrCallbacks);
    } else if (Array.isArray(callbackOrCallbacks)) {
      callbackOrCallbacks.forEach(addCallback);
    }
  };

  if (callbackOrCallbacks) {
    addCallback(callbackOrCallbacks);
  }

  return {
    add: addCallback,
    clear() {
      callbacks.clear();
    },
    /** @param {(callback: ScrollCallback) => void} handler */
    forEach(handler) {
      callbacks.forEach(handler);
    },
  };
}

/** @type {ScrollWatcherOptions} */
export const DEFAULTS = {
  target: window,
  axis: "y",
  threshold: 150,
};

/**
 * @param {ScrollWatcherOptions} [options]
 */
export function createScrollWatcher(options) {
  const { target, axis, threshold, ...settings } = Object.assign(
    DEFAULTS,
    options
  );
  const getScrollValue = createScrollValueGetter(target, axis);
  const onScrollStart = createScrollCallbackManager(settings.onScrollStart);
  const onScroll = createScrollCallbackManager(settings.onScroll);
  const onScrollEnd = createScrollCallbackManager(settings.onScrollEnd);

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

      onScrollStart.forEach((callback) => {
        if (start) {
          callback(start);
        }
      });

      emit(target, "scrollstart", start);
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

    onScroll.forEach((callback) => {
      callback(scroll);
    });

    thresholdTimeout = setTimeout(() => {
      thresholdTimeout = null;
      start = null;
      previous = null;
      distance = 0;

      onScrollEnd.forEach((callback) => {
        callback(scroll);
      });

      emit(target, "scrollend", scroll);
    }, threshold);
  };

  target.addEventListener("scroll", listener);

  return {
    /** @param {ScrollCallback} callback */
    set onScrollStart(callback) {
      onScrollStart.add(callback);
    },
    /** @param {ScrollCallback} callback */
    set onScrollEnd(callback) {
      onScrollEnd.add(callback);
    },
    /** @param {ScrollCallback} callback */
    set onScroll(callback) {
      onScroll.add(callback);
    },
    destroy() {
      onScrollStart.clear();
      onScrollEnd.clear();
      onScroll.clear();
      target.removeEventListener("scroll", listener);
    },
  };
}

export default createScrollWatcher;

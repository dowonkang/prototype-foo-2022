/** @typedef {() => void} EventListenerRemover */

/**
 * @param {EventTarget} target
 * @param {string} type
 * @param {EventListenerOrEventListenerObject} listener
 * @param {(boolean | AddEventListenerOptions)} options
 * @returns {EventListenerRemover}
 */
export function on(target, type, listener, options) {
  target.addEventListener(type, listener, options);
  return () => {
    target.removeEventListener(type, listener);
  };
}

/**
 * @param {EventTarget} target
 * @param {string} type
 * @param {EventListenerOrEventListenerObject} listener
 * @returns {EventListenerRemover}
 */
export function once(target, type, listener) {
  return on(target, type, listener, { once: true });
}

/**
 * @param {EventTarget} target
 * @param {string} type
 * @param {*} [detail]
 * @returns {boolean}
 */
export function emit(target, type, detail) {
  const event = detail ? new CustomEvent(type, { detail }) : new Event(type);
  return target.dispatchEvent(event);
}

/**
 * @param {unknown} x
 * @returns {x is number}
 */
const isNumber = (x) => typeof x === "number" && !Number.isNaN(x);

/**
 * @typedef {Object} EffectOptions
 * @property {string} EffectOptions.from
 * @property {string} EffectOptions.active
 * @property {string} EffectOptions.to
 * @property {("transition" | "animation")} EffectOptions.type
 * @property {number} [EffectOptions.timeout]
 * @property {boolean} [EffectOptions.keepToClass]
 */

/**
 * @param {Element} element
 * @param {EffectOptions} options
 * @returns {Promise<Element>}
 */
export function startEffect(element, options) {
  return new Promise((resolve, reject) => {
    const { type, from, active, to, timeout, keepToClass } = options;
    let error;

    if (
      typeof type !== "string" ||
      !(type === "transition" || type === "animation")
    ) {
      error = new TypeError(`${type} should be "transition" or "animation".`);
    }

    if (
      ![from, active, to].every((className) => typeof className === "string")
    ) {
      error = new TypeError(
        "`from`, `active` and `to` options should be class names."
      );
    }

    if (error) {
      reject(error);
      return;
    }

    try {
      const eventType = `${type}end`;
      const classNamesToRemove = [from, active];

      if (!keepToClass) {
        classNamesToRemove.push(to);
      }

      const cleanup = () => {
        removeEndListener();
        element.classList.remove(...classNamesToRemove);
      };

      const timeoutHandle =
        isNumber(timeout) &&
        setTimeout(() => {
          cleanup();
        }, timeout);
      const listener = () => {
        if (timeoutHandle) {
          clearTimeout(timeoutHandle);
        }
        cleanup();
        resolve(element);
      };

      element.addEventListener(eventType, listener, { once: true });
      const removeEndListener = () => {
        element.removeEventListener(eventType, listener);
      };

      element.classList.remove(to);
      element.classList.add(from, active);
      requestAnimationFrame(() => {
        element.classList.add(to);
      });
    } catch (error) {
      reject(error);
    }
  });
}

/** @type {EffectOptions} */
export const ENTER_DEFAULTS = {
  from: "enter-from",
  active: "enter-active",
  to: "enter-to",
  keepToClass: false,
  type: "transition",
};

/**
 * @param {Element} element
 * @param {EffectOptions} options
 * @returns {Promise<Element>}
 */
export function enterEffect(element, options = ENTER_DEFAULTS) {
  return startEffect(element, options);
}

/** @type {EffectOptions} */
export const LEAVE_DEFAULTS = {
  from: "leave-from",
  active: "leave-active",
  to: "leave-to",
  keepToClass: false,
  type: "transition",
};

/**
 * @param {Element} element
 * @param {EffectOptions} options
 * @returns {Promise<Element>}
 */
export function leaveEffect(element, options = LEAVE_DEFAULTS) {
  return startEffect(element, options);
}

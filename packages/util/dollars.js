/**
 * @param {string} selector
 * @param {ParentNode} parent
 * @returns {?Element}
 */
export function $(selector, parent = document) {
  return parent.querySelector(selector);
}

/**
 * @param {string} selector
 * @param {ParentNode} parent
 * @returns {Element[]}
 */
export function $$(selector, parent = document) {
  return Array.from(parent.querySelectorAll(selector));
}

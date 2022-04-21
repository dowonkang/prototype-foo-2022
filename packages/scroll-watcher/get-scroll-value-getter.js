/**
 * @param {(Window | Element)} target
 * @param {("x" | "y")} direction
 * @returns {() => number}
 */
export default function getScrollValueGetter(target = window, direction = "y") {
  let propertyName = `scroll${direction.toUpperCase()}`;

  if (!(propertyName in target)) {
    propertyName = `scroll${direction === "x" ? "Left" : "Top"}`;
  }

  return () => target[propertyName];
}

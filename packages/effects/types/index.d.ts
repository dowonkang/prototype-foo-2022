export function startEffect(
  element: Element,
  options: EffectOptions
): Promise<Element>;
export function enterEffect(
  element: Element,
  options?: EffectOptions
): Promise<Element>;
export function leaveEffect(
  element: Element,
  options?: EffectOptions
): Promise<Element>;
export const ENTER_DEFAULTS: EffectOptions;
export const LEAVE_DEFAULTS: EffectOptions;
export type EffectOptions = {
  from: string;
  active: string;
  to: string;
  type: "transition" | "animation";
  timeout?: number | undefined;
  removeToClassOnFinish?: boolean | undefined;
};
//# sourceMappingURL=index.d.ts.map

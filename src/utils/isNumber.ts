import { isValid } from './isValid';

export function isNumber(value: string) {
  return isValid(value) && isFinite(Number(value));
}

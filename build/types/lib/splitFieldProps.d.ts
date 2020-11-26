import { AnyObject } from '../generic';
import { StrictFieldProps } from '../elements/Field';
declare type Rest<P> = {
  [K in keyof P]: K extends keyof StrictFieldProps ? never : P[K];
};
export default function splitFieldProps<P extends AnyObject>(
  props: P
): readonly [StrictFieldProps, Rest<P>];
export {};

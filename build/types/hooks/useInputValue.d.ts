import { ChangeHandler } from '../generic';
import { InputProps } from '../elements/Input';
export declare function useInputValue<T = string>(
  initialValue?: T
): [T, ChangeHandler<HTMLInputElement, InputProps>, string];

import * as React from 'react';
import { ClickHandler } from '../generic';
import { CheckboxProps } from '../elements/Checkbox';
export declare function useCheckboxValue(
  initialValue?: boolean
): readonly [
  boolean,
  ClickHandler<HTMLLabelElement, CheckboxProps>,
  React.Dispatch<React.SetStateAction<boolean | undefined>>
];

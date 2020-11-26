import * as React from 'react';
import { CheckboxProps } from '../../elements/Checkbox';
import { DayPickerProps, ParsableDate } from '../../elements/DayPicker';
import { InputProps } from '../../elements/Input';
import { SelectMultiProps, SelectProps } from '../../elements/Select';
import { FormikFieldComponentProps } from './lib/withFormikField.types';
export declare const FormikCheckbox: import('./lib/withFormikField.types').FormikFieldComponent<CheckboxProps>;
export declare const FormikDayPicker: import('./lib/withFormikField.types').FormikFieldComponent<DayPickerProps<
  ParsableDate
>>;
export declare const FormikInput: import('./lib/withFormikField.types').FormikFieldComponent<InputProps>;
export declare const FormikTime: import('./lib/withFormikField.types').FormikFieldComponent<InputProps>;
export declare const FormikSelect: <Option extends import('../../generic').AnyObject>(
  wrapperProps: React.PropsWithChildren<
    FormikFieldComponentProps<SelectProps<Option, Option, null>>
  >
) => React.ReactElement<any, any> | null;
export declare const FormikMultiSelect: <Option extends import('../../generic').AnyObject>(
  wrapperProps: React.PropsWithChildren<
    FormikFieldComponentProps<SelectMultiProps<Option>>
  >
) => React.ReactElement<any, any> | null;

import * as React from 'react';

import { DayPickerProps } from '../DayPicker';

export interface FormikDayPickerProps extends StrictFormikDayPickerProps {
  [key: string]: any
}

export interface StrictFormikDayPickerProps extends DayPickerProps { }

interface FormikDayPickerComponent extends React.StatelessComponent<FormikDayPickerProps> { }

declare const FormikDayPicker: FormikDayPickerComponent

export default FormikDayPicker;

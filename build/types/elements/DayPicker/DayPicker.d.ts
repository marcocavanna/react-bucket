import * as React from 'react';
import 'react-day-picker/src/style.css';
import { DayPickerProps, ParsableDate } from './DayPicker.types';
declare type DayPickerComponent = React.FunctionComponent<
  DayPickerProps<ParsableDate>
>;
declare const DayPicker: DayPickerComponent;
export default DayPicker;

import * as React from 'react';
import { FormProps } from './Form.types';
import { Button } from '../../elements/Button';
import { Checkbox } from '../../elements/Checkbox';
import { DayPicker } from '../../elements/DayPicker';
import { Input } from '../../elements/Input';
import { Select } from '../../elements/Select';
declare type FormComponent = React.FunctionComponent<FormProps> & {
  Button: typeof Button;
  Checkbox: typeof Checkbox;
  DayPicker: typeof DayPicker;
  Input: typeof Input;
  Select: typeof Select;
};
declare const Form: FormComponent;
export default Form;

import * as React from 'react';
import clsx from 'clsx';
import { useWithDefaultProps } from '../../context/BucketContext';

import {
  useSharedClassName
} from '../../lib';

import { FormProps } from './Form.types';

import { Button } from '../../elements/Button';
import { Checkbox } from '../../elements/Checkbox';
import { DayPicker } from '../../elements/DayPicker';
import { Input } from '../../elements/Input';
import { Select } from '../../elements/Select';


/* --------
 * Declare Component
 * -------- */
type FormComponent = React.FunctionComponent<FormProps> & {
  Button: typeof Button;
  Checkbox: typeof Checkbox;
  DayPicker: typeof DayPicker;
  Input: typeof Input;
  Select: typeof Select;
};


/* --------
 * Component Render
 * -------- */
const Form: FormComponent = (receivedProps) => {

  const props = useWithDefaultProps('form', receivedProps);

  const {
    className,
    rest: {
      children,
      content,
      disabled,
      onSubmit,
      ...rest
    }
  } = useSharedClassName(props);

  /** Build the element class list */
  const classes = clsx(
    { disabled },
    'form',
    className
  );


  /* --------
   * Form Submit Handler
   * -------- */
  const handleFormSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    /** Prevent any default action, only if action props is not defined */
    if (typeof props.action !== 'string') {
      e.preventDefault();
    }

    /** Disabled Form couldn't be submitted */
    if (disabled) {
      return;
    }

    /** Call the user defined onSubmit handler */
    if (typeof onSubmit === 'function') {
      onSubmit(e, props);
    }
  };


  /* --------
   * Render the Form
   * -------- */
  return (
    <form {...rest} className={classes} onSubmit={handleFormSubmit}>
      {children}
    </form>
  );
};

Form.displayName = 'Form';


/* --------
 * Base Form Element
 * -------- */
Form.Button = Button;
Form.Checkbox = Checkbox;
Form.DayPicker = DayPicker;
Form.Input = Input;
Form.Select = Select;

export default Form;

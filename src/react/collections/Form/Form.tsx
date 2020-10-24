import * as React from 'react';
import clsx from 'clsx';

import {
  useSharedClassName
} from '../../lib';

import { FormProps } from './Form.types';

import { Button } from '../../elements/Button';
import { Checkbox } from '../../elements/Checkbox';
import { DayPicker } from '../../elements/DayPicker';
import { Input } from '../../elements/Input';
import { Select } from '../../elements/Select';

import FormFormik from './FormFormik';
import * as FormikFields from './FormikFields';


export default function Form(props: FormProps): React.ReactElement<FormProps> {

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
  const handleFormSubmit = React.useCallback(
    (e: React.FormEvent<HTMLFormElement>) => {
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
    },
    [ onSubmit ]
  );


  /* --------
   * Render the Form
   * -------- */
  return (
    <form {...rest} className={classes} onSubmit={handleFormSubmit}>
      {children}
    </form>
  );
}

Form.displayName = 'Form';


/* --------
 * Base Form Element
 * -------- */
Form.Button = Button;
Form.Checkbox = Checkbox;
Form.DayPicker = DayPicker;
Form.Input = Input;
Form.Select = Select;


/* --------
 * Formik Fields Element
 * -------- */
Form.Formik = FormFormik;
Form.FormikCheckbox = FormikFields.FormikCheckbox;
Form.FormikDayPicker = FormikFields.FormikDayPicker;
Form.FormikInput = FormikFields.FormikInput;
Form.FormikTime = FormikFields.FormikTime;

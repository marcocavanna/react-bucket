import * as React from 'react';

import { FieldMetaProps, FieldValidator, FormikContextType, useFormikContext } from 'formik';

import { SharedComponentStateProps } from '../../../generic';


type AnyObject = { [key: string]: any };

/* --------
 * Props passed down to Formik Wrapped Component
 * -------- */
export type FormikWrappedComponentProps<P, ValueType> = {
  /** Meta Props */
  meta: FieldMetaProps<ValueType>;

  /** All initial Component Props */
  rest: P & {
    onBlur: (...args: any[]) => void;
    onChange: (...args: any[]) => void;
    name: string;
    value: ValueType;
  };

  /** Current Field State */
  state: FieldState;
};

export type FieldState = SharedComponentStateProps & {
  /** Check if Form Validation has appended a Message to this Field */
  hasValidationStatus: boolean;

  /** Get if form is currently submitting */
  isSubmitting: boolean;

  /** Validation Message */
  message: string | undefined;
};


/* --------
 * Inner Component available Props
 * -------- */
export type FormikWrappedInnerProps = AnyObject & {
  /** Local onBlur handler */
  onBlur?: (...args: any[]) => void;

  /** Local onChange handler */
  onChange?: (...args: any[]) => void;

  /** Field name used by Formik */
  name?: string;

  /** A local validator function */
  validate?: FieldValidator;
};


/* --------
 * Outer extended props of Wrapped Component
 * -------- */
export type FormikWrappedOuterProps<P, Values extends AnyObject, K extends keyof Values> = P & {
  /** Name is required to let formik work */
  name: K;

  /** Field Validator Function */
  validate?: FieldValidator;
};


/* --------
 * Formik Wrapper Configuration
 * -------- */
export interface WithFormikFieldConfiguration<P extends FormikWrappedInnerProps, ValueType> {
  /** The Form Component */
  Component: React.ComponentType<FormikWrappedComponentProps<P, ValueType>>;

  /** Manual override value computing */
  computeValue?: (value: ValueType, props: {
    multiple?: boolean;
    checked?: boolean;
    name: string;
  } & P) => ValueType;

  /** Overwrite default formik field onChange handler */
  onChange?: (formik: FormikContextType<any>, props: {
    multiple?: boolean;
    checked?: boolean;
    name: string;
    value: ValueType;
  } & P) => void;

  /** Set a field has touched on value change, default to true */
  setTouchedOnChange?: boolean;
}


/* --------
 * Formik Wrapper HOC
 * -------- */
export default function withFormikField<P extends FormikWrappedInnerProps, ValueType = any>(
  configuration: WithFormikFieldConfiguration<P, ValueType>
) {

  /** Get field configuration */
  const {
    Component,
    computeValue,
    onChange: overwrittenChangeHandler,
    setTouchedOnChange = true
  } = configuration;

  return function renderFormikField<Values extends AnyObject, K extends keyof Values>(
    props: React.PropsWithChildren<FormikWrappedOuterProps<P, Values, K>>
  ): React.ReactElement<P> {

    /** Get component props */
    const {
      name,
      validate,
      onChange: localOnChangeHandler,
      onBlur  : localOnBlurHandler,
      ...componentRestProps
    } = props;


    /* --------
     * Init the Hook to use Formik
     * -------- */
    const formik = useFormikContext<Values>();


    /* --------
     * Lifecycle Events to Register formik Field
     * -------- */
    React.useEffect(
      () => {
        /** Register the new Field */
        formik.registerField(name as string, { validate });

        /** Unregister form field on component unmount */
        return () => {
          formik.unregisterField(name as string);
        };
      },
      [
        formik.registerField,
        formik.unregisterField,
        name,
        validate
      ]
    );


    /* --------
     * Build Component Props
     * -------- */
    const {
      name    : formikFieldName,
      onBlur  : formikBlurHandler,
      onChange: formikChangeHandler,
      value,
      ...formikFieldRest
    } = formik.getFieldProps<Values[K]>({ name, ...componentRestProps });


    /* --------
     * Field Handlers
     * -------- */
    const handleFieldChange = React.useCallback(
      (event: React.FormEvent | React.ChangeEvent, componentPropsFromEvent: P, ...restArgs) => {
        /** Check if field must be set as touched on change */
        if (setTouchedOnChange) {
          formik.setFieldTouched(formikFieldName, true, false);
        }

        /** Check which handler must be used */
        if (overwrittenChangeHandler) {
          overwrittenChangeHandler(formik, {
            ...formikFieldRest,
            ...componentPropsFromEvent,
            name: formikFieldName,
            value
          });
        }
        /** Else, fire the original formik handler */
        else {
          formikChangeHandler(event);
        }

        /** Fire the Local onChange handler */
        if (localOnChangeHandler) {
          localOnChangeHandler(event, componentPropsFromEvent, ...restArgs);
        }
      },
      [
        formik,
        formikFieldName,
        value,
        overwrittenChangeHandler,
        formikChangeHandler,
        localOnChangeHandler
      ]
    );

    const handleFieldBlur = React.useCallback(
      (event: React.FocusEvent, componentPropsFromEven: P, ...restArgs) => {
        /** Fire Formik original blur handler */
        formikBlurHandler(event);

        /** Fire the local blur handler */
        if (localOnBlurHandler) {
          localOnBlurHandler(event, componentPropsFromEven, ...restArgs);
        }
      },
      [
        localOnBlurHandler,
        formikBlurHandler
      ]
    );


    /* --------
     * Meta Props Definition
     * -------- */
    const meta = formik.getFieldMeta<Values[K]>(formikFieldName);


    /* --------
     * Check if Value must be computed
     * -------- */
    const fieldValue = React.useMemo<ValueType>(
      () => {
        if (computeValue) {
          return computeValue(value, {
            ...formikFieldRest,
            ...(props as unknown as P),
            name: formikFieldName
          });
        }
        return value;
      },
      [
        value
      ]
    );


    /* --------
     * Render the Component
     * -------- */
    return (
      <Component
        state={{
          danger             : !!(meta.error || props.danger),
          hasValidationStatus: !!(meta.error || props.error || props.success || props.warning),
          isSubmitting       : formik.isSubmitting,
          message            : meta.error,
          success            : props.success,
          warning            : props.warning
        }}
        meta={meta}
        rest={{
          ...(props as unknown as P),
          name,
          onBlur  : handleFieldBlur,
          onChange: handleFieldChange,
          value   : fieldValue
        }}
      />
    );
  };
}

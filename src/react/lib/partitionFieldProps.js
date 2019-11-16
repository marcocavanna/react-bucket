import _ from 'lodash';

export const allFieldProps = [
  /** State Attributes */
  'success',
  'warning',
  'error',
  'primary',
  'secondary',

  /** Sizing and Element */
  'as',
  'size',
  'className',

  /** Form Props */
  'focus',
  'required',
  'disabled',

  /** Display Attrs */
  'full',
  'bordered',

  /** Action, Label and Icon Attrs */
  'label',
  'action',
  'actionPosition',
  'icon',
  'iconPosition',
  'inlineLabel',
  'inlineLabelPosition',
  'messages',
  'hint',
  'hintColor',

  /** Content */
  'content'
];

export const partitionFieldProps = (props) => {

  const fieldProps = {};
  const rest = {};

  _.forEach(props, (val, prop) => {
    const target = allFieldProps.includes(prop)
      ? fieldProps
      : rest;

    target[prop] = val;
  });

  return [fieldProps, rest];

};

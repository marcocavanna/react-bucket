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
  'contentClassName',

  /** Form Props */
  'focus',
  'required',
  'disabled',

  /** Display Attrs */
  'full',
  'bordered',
  'inline',
  'textAlign',
  'flat',

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

/** @returns {[fieldProps, rest]} */
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

import React from 'react';
import PropTypes from 'prop-types';
import cx from 'classnames';

import {
  customPropTypes,
  getElementType,
  getUnhandledProps,
  classByPattern,
  classByKey,
  childrenUtils
} from '../../lib';

import Button from '../Button';
import Icon from '../Icon';
import Label from '../Label';

import FieldMessages from './FieldMessages';

function Field(props) {

  const {
    action,
    actionPosition,
    bordered,
    checkbox,
    children,
    className,
    content,
    contentClassName,
    error,
    disabled,
    focus,
    form,
    full,
    hint,
    hintColor,
    icon,
    iconPosition,
    inlineLabel,
    inlineLabelPosition,
    input,
    label,
    messages,
    radio,
    required,
    size,
    success,
    text,
    warning
  } = props;

  const classes = cx(
    'field',
    classByKey(text && !form, 'text'),
    classByKey(form, 'form-field'),
    classByKey(success, 'is-success'),
    classByKey(warning, 'is-warning'),
    classByKey(error, 'is-danger'),
    classByKey(disabled, 'is-disabled'),
    classByKey(focus, 'is-focused'),
    classByPattern(size, 'is-%value%'),
    classByKey(required, 'is-required'),
    className
  );

  const contentClasses = cx(
    'content',
    classByKey(checkbox, 'checkbox'),
    classByKey(input, 'input'),
    classByKey(radio, 'radio'),
    classByKey(full, 'is-full'),
    classByKey(bordered, 'is-bordered'),
    classByKey(action, 'with-action'),
    classByPattern(action && actionPosition, 'action-on-%value%'),
    classByKey(icon, 'with-icon'),
    classByPattern(icon && iconPosition, 'icon-on-%value%'),
    classByKey(inlineLabel, 'with-label'),
    classByPattern(inlineLabel && inlineLabelPosition, 'label-on-%value%'),
    contentClassName
  );

  const hintClasses = cx(
    'addon',
    'field-hint',
    classByPattern(hintColor, 'is-%value%')
  );

  const rest = getUnhandledProps(Field, props);
  const ElementType = getElementType(Field, props);

  const fieldContent = childrenUtils.isNil(children) ? content : children;

  const actionElement = Button.create(action, { autoGenerateKey: false });
  const labelElement = Label.create(inlineLabel, { autoGenerateKey: false });
  const iconElement = Icon.create(icon, { autoGenerateKey: false });

  return (
    <ElementType {...rest} className={classes}>

      {/* Append the Label */}
      {label && <label>{label}</label>}

      {/* Append Field Content */}
      <div className={contentClasses}>
        {actionPosition === 'left' && actionElement}
        {inlineLabelPosition === 'left' && labelElement}
        {iconPosition === 'left' && iconElement}

        {/* Main Field Content */}
        {fieldContent}

        {iconPosition === 'right' && iconElement}
        {inlineLabelPosition === 'right' && labelElement}
        {actionPosition === 'right' && actionElement}
      </div>

      {/* Append Field Hint */}
      {hint && <div className={hintClasses}>{hint}</div>}

      {/* Append Field Messages */}
      {
        Array.isArray(messages) && messages.length
          ? FieldMessages.create(messages, { autoGenerateKey: false })
          : null
      }

    </ElementType>
  );
}

Field.propTypes = {
  /** Action Button */
  action: PropTypes.any,

  /** Action Position */
  actionPosition: PropTypes.oneOf(['left', 'right']),

  /** An element used to render the content */
  as: PropTypes.elementType,

  /** Bordered Input Field */
  bordered: PropTypes.bool,

  /** Set the field as a Checkbox container */
  checkbox: PropTypes.bool,

  /** Primary content. */
  children: PropTypes.node,

  /** User defined classes */
  className: PropTypes.string,

  /** Field Content */
  content: PropTypes.node,

  /** ClassName for Content Element */
  contentClassName: PropTypes.string,

  /** Disabled style */
  disabled: PropTypes.bool,

  /** Error style for field */
  error: PropTypes.bool,

  /** Field as Focused */
  focus: PropTypes.bool,

  /** Set the Field as Form Field */
  form: PropTypes.bool,

  /** Full Width Field */
  full: PropTypes.bool,

  /** Hint Content */
  hint: PropTypes.any,

  /** The hint color */
  hintColor: PropTypes.string,

  /** Icon to Show */
  icon: customPropTypes.fontAwesome,

  /** Icon Position */
  iconPosition: PropTypes.oneOf(['left', 'right']),

  /** Show an Inline Label */
  inlineLabel: PropTypes.string,

  /** Set the inline label position */
  inlineLabelPosition: PropTypes.oneOf(['left', 'right']),

  /** Set the field as input container */
  input: PropTypes.bool,

  /** Label Content */
  label: PropTypes.any,

  /** Messages to show */
  messages: PropTypes.arrayOf(PropTypes.string),

  /** Set the field as radio container */
  radio: PropTypes.bool,

  /** Set field as required */
  required: PropTypes.bool,

  /** Field Size */
  size: PropTypes.bool,

  /** Success Style */
  success: PropTypes.bool,

  /** Set a Field as Text Container */
  text: PropTypes.bool,

  /** Warning Style */
  warning: PropTypes.bool
};

Field.defaultProps = {
  actionPosition      : 'right',
  bordered            : true,
  full                : true,
  iconPosition        : 'left',
  inlineLabelPosition : 'left',
  text                : true
};

export default Field;

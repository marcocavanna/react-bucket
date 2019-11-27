import React, { PureComponent } from 'react';
import PropTypes from 'prop-types';
import cx from 'classnames';

import _ from 'lodash';

import {
  customPropTypes,
  childrenUtils,
  classByKey,
  classByPattern,
  getElementType,
  getUnhandledProps,
  createShorthandFactory
} from '../../lib';

import ButtonGroup from './ButtonGroup';
import Icon from '../Icon';

class Button extends PureComponent {

  /**
   * Button PropTypes declaration
   */
  static propTypes = {
    /** Element used to Render the Component */
    as: PropTypes.elementType,

    /** Primary content. */
    children: PropTypes.node,

    /** Circle Button */
    circle: PropTypes.bool,

    /** Additional Class */
    className: PropTypes.string,

    /** Button Background Color */
    color: PropTypes.string,

    /** Button Content Property */
    content: PropTypes.node,

    /** Danger Color */
    danger: PropTypes.bool,

    /** Disabled State */
    disabled: PropTypes.bool,

    /** Generate Button as Fab */
    fab: PropTypes.bool,

    /** Display Button as Flat */
    flat: PropTypes.bool,

    /** Set fullwidth Button */
    full: PropTypes.bool,

    /** Icon Property or Definition */
    icon: PropTypes.oneOfType([
      PropTypes.bool,
      customPropTypes.fontAwesome
    ]),

    /** Icon Position */
    iconPosition: PropTypes.oneOf(['left', 'right']),

    /** Info Color */
    info: PropTypes.bool,

    /** Inverted Color */
    inverted: PropTypes.bool,

    /** Button with Loader */
    loading: PropTypes.bool,

    /** Primary Color */
    primary: PropTypes.bool,

    /** Role Attributes */
    role: PropTypes.bool,

    /** Render Rounded Button */
    rounded: PropTypes.bool,

    /** Secondary Color */
    secondary: PropTypes.bool,

    /** Change Button Size */
    size: customPropTypes.size,

    /** Success Color */
    success: PropTypes.bool,

    /** Tab Index Order */
    tabIndex: PropTypes.number,

    /** Warning Color */
    warning: PropTypes.bool
  }

  /**
   * Set Button Default Props
   */
  static defaultProps = {
    as: 'button'
  }

  /**
   * Build ButtonGroup Method
   */
  static Group = ButtonGroup;

  /**
   * Aria Props
   */
  getAriaRole = (ElementType) => {  // eslint-disable-line
    const { role } = this.props;

    if (!_.isNil(role)) return role;
    if (ElementType !== 'button') return 'button';
    return null;
  }

  /**
   * TabIndex will be computed
   * using disabled props and/or
   * the original tab index property
   * if exists. A disabled button will
   * have tabIndex = -1
   */
  getTabIndex = (ElementType) => {
    const { disabled, tabIndex } = this.props;

    if (!_.isNil(tabIndex)) return tabIndex;
    if (disabled) return -1;
    if (ElementType === 'div') return 0;
    return null;
  }

  /**
   * Build a function to handle
   * click event on button, preventing
   * all action if is disabled
   *
   * @param {React.SyntheticEvent} e
   */
  handleClick = (e) => {
    const { disabled } = this.props;

    if (disabled) {
      e.preventDefault();
      return;
    }

    _.invoke(this.props, 'onClick', e, this.props);
  }

  /**
   * Check if Button must have
   * the icon class
   */
  hasIconClass = () => {
    const { iconPosition, children, content, icon } = this.props;

    if (icon === true) return true;
    return icon && (iconPosition || (childrenUtils.isNil(children) && _.isNil(content)));
  }

  /**
   * Render function for Button Component
   */
  render() {

    const {
      color,
      content,
      children,
      circle,
      className,
      danger,
      disabled,
      fab,
      flat,
      full,
      icon,
      iconPosition,
      info,
      inverted,
      loading,
      primary,
      rounded,
      secondary,
      size,
      success,
      warning
    } = this.props;

    const classes = cx(
      fab && !content ? 'is-fab' : 'button',
      classByPattern(color, 'is-%value%'),
      classByKey(danger, 'is-danger'),
      classByKey(disabled, 'is-disabled'),
      classByKey(full, 'is-full'),
      classByKey(flat, 'is-flat'),
      classByKey(icon && !content && !fab, 'as-icon'),
      classByKey(icon && content, 'with-icon'),
      classByPattern(icon && content && (iconPosition || 'left'), 'on-the-%value%'),
      classByKey(info, 'is-info'),
      classByKey(inverted, 'is-inverted'),
      classByKey(loading, 'is-loading'),
      classByKey(primary, 'is-primary'),
      classByKey(rounded, 'is-rounded'),
      classByKey(circle, 'is-circle'),
      classByKey(secondary, 'is-secondary'),
      classByKey(size, 'is-%value%'),
      classByKey(success, 'is-success'),
      classByKey(warning, 'is-warning'),
      className
    );


    const rest = getUnhandledProps(Button, this.props);
    const ElementType = getElementType(Button, this.props);
    const tabIndex = this.getTabIndex(ElementType);
    const role = this.getAriaRole(ElementType);
    const hasChildren = !childrenUtils.isNil(children);

    return (
      <ElementType
        {...rest}
        className={classes}
        disabled={(disabled && ElementType === 'button') || undefined}
        role={role}
        tabIndex={tabIndex}
        onClick={this.handleClick}
      >
        {hasChildren && children}
        {!hasChildren && icon && (!iconPosition || iconPosition === 'left') && Icon.create(icon, { autoGenerateKey: false })}
        {!hasChildren && content}
        {!hasChildren && icon && iconPosition === 'right' && Icon.create(icon, { autoGenerateKey: false })}
      </ElementType>
    );
  }

}


Button.create = createShorthandFactory(Button, (val) => {
  if (_.isObject(val) && !_.isArray(val)) {
    return val;
  }

  return { content: val };
});


export default Button;

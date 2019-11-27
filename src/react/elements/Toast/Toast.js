import React from 'react';
import PropTypes from 'prop-types';
import cx from 'classnames';

import {
  customPropTypes,
  getElementType,
  getUnhandledProps,
  childrenUtils,
  classByKey
} from '../../lib';

import ToastHeader from './ToastHeader';
import ToastContent from './ToastContent';

import Icon from '../Icon';

function Toast(props) {

  const {
    children,
    className,
    content,
    dismissable,
    error,
    header,
    icon,
    info,
    onClick,
    primary,
    secondary,
    success,
    warning
  } = props;

  const classes = cx(
    'toast',
    classByKey(dismissable, 'is-dismissable'),
    classByKey(error, 'is-danger'),
    classByKey(info, 'is-info'),
    classByKey(primary, 'is-primary'),
    classByKey(secondary, 'is-secondary'),
    classByKey(success, 'is-success'),
    classByKey(warning, 'is-warning'),
    classByKey(onClick, 'is-clickable'),
    className
  );

  const _rest = getUnhandledProps(Toast, props);
  const ElementType = getElementType(Toast, props);

  /** Remove Butter Toast Props from rest */
  const {
    calcRemaining,
    dismiss,
    onClick: onClickHandler,
    remove,
    setHeight,
    toastId,
    trayPosition,
    ...rest
  } = _rest;

  if (!childrenUtils.isNil(children)) {
    return (
      <ElementType {...rest} className={classes}>
        {typeof children === 'function' ? children({ dismiss }) : children}
      </ElementType>
    );
  }

  const headerElement = header && ToastHeader.create(header, { autoGenerateKey: false });
  const contentElement = content && ToastContent.create(content, { autoGenerateKey: false });

  const dimissIconName = typeof dismissable === 'string' ? dismissable : 'times';


  const handleClick = e => typeof onClick === 'function' && onClick(e, props);
  const handleDismiss = (e) => {
    /** Dismiss event must stop propagation of event */
    e.stopPropagation();

    /** If dismiss is a function, execute it */
    if (typeof dismiss === 'function') {
      dismiss();
    }
  };

  return (
    <ElementType {...rest} className={classes} onClick={handleClick}>
      {icon && <div className='toast-icon'><Icon name={icon} /></div>}
      <div className='toast-body'>
        {headerElement}
        {contentElement}
      </div>
      {dismissable && (
        <div className='toast-dismiss'>
          <Icon name={dimissIconName} onClick={handleDismiss} />
        </div>
      )}
    </ElementType>
  );
}

Toast.Header = ToastHeader;
Toast.Content = ToastContent;

Toast.propTypes = {
  /** An element used to render the component */
  as: PropTypes.elementType,

  /** Primary content. */
  children: PropTypes.node,

  /** User defined Classes */
  className: PropTypes.string,

  /** Toast Content Shorthand */
  content: PropTypes.node,

  /** Is toast dismissable manually? */
  dismissable: PropTypes.oneOfType([
    PropTypes.bool,
    customPropTypes.fontAwesome
  ]),

  /** Toast with error style */
  error: PropTypes.bool,

  /** Toast Header Shorthand */
  header: PropTypes.any,

  /** Toast Icon */
  icon: customPropTypes.fontAwesome,

  /** Toast with info style */
  info: PropTypes.bool,

  /**
   * Called after user's click.
   * @param {SyntheticEvent} event - React's original SyntheticEvent.
   * @param {object} data - All props.
   */
  onClick: PropTypes.func,

  /** Toast with primary style */
  primary: PropTypes.bool,

  /** Toast with secondary style */
  secondary: PropTypes.bool,

  /** Toast with success style */
  success: PropTypes.bool,

  /** Toast with warning style */
  warning: PropTypes.bool
};

export default Toast;

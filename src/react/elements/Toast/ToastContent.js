import React from 'react';
import PropTypes from 'prop-types';
import cx from 'classnames';

import {
  customPropTypes,
  getElementType,
  getUnhandledProps,
  childrenUtils,
  createShorthandFactory
} from '../../lib';

function ToastContent(props) {

  const {
    children,
    className,
    content
  } = props;

  const classes = cx(
    'toast-content',
    className
  );

  const rest = getUnhandledProps(ToastContent, props);
  const ElementType = getElementType(ToastContent, props);

  return (
    <ElementType {...rest} className={classes}>
      {childrenUtils.isNil(children) ? content : children}
    </ElementType>
  );

}

ToastContent.propTypes = {
  /** An element used to render the component */
  as: customPropTypes.as,

  /** User defined Classes */
  className: PropTypes.string,

  /** Content Shorthand */
  content: PropTypes.any
};

ToastContent.create = createShorthandFactory(ToastContent, content => ({ content }));

export default ToastContent;

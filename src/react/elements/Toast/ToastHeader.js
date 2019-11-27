import React from 'react';
import PropTypes from 'prop-types';
import cx from 'classnames';

import {
  getElementType,
  getUnhandledProps,
  childrenUtils,
  createShorthandFactory
} from '../../lib';

function ToastHeader(props) {

  const {
    children,
    className,
    content
  } = props;

  const classes = cx(
    'toast-header',
    className
  );

  const rest = getUnhandledProps(ToastHeader, props);
  const ElementType = getElementType(ToastHeader, props);

  return (
    <ElementType {...rest} className={classes}>
      {childrenUtils.isNil(children) ? content : children}
    </ElementType>
  );
}

ToastHeader.propTypes = {
  /** An element used to render the component */
  as: PropTypes.elementType,

  /** Primary content. */
  children: PropTypes.node,

  /** User defined Classes */
  className: PropTypes.string,

  /** Content Shorthand */
  content: PropTypes.any
};

ToastHeader.create = createShorthandFactory(ToastHeader, content => ({ content }));

export default ToastHeader;

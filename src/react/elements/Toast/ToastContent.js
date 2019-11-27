import React from 'react';
import PropTypes from 'prop-types';
import cx from 'classnames';

import {
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
  as: PropTypes.elementType,

  /** Primary content. */
  children: PropTypes.node,

  /** User defined Classes */
  className: PropTypes.string,

  /** Content Shorthand */
  content: PropTypes.node
};

ToastContent.create = createShorthandFactory(ToastContent, content => ({ content }));

export default ToastContent;

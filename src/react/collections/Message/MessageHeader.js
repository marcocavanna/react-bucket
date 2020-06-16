import React from 'react';
import PropTypes from 'prop-types';
import cx from 'classnames';

import {
  childrenUtils,
  createShorthandFactory,
  getElementType,
  getUnhandledProps
} from '../../lib';

/**
 * A message can contain a header.
 */
function MessageHeader(props) {
  const { children, className, content } = props;
  const classes = cx('header', className);
  const rest = getUnhandledProps(MessageHeader, props);
  const ElementType = getElementType(MessageHeader, props);

  return (
    <ElementType {...rest} className={classes}>
      {childrenUtils.isNil(children) ? content : children}
    </ElementType>
  );
}

MessageHeader.propTypes = {
  /** An element type to render as (string or function). */
  as: PropTypes.elementType,

  /** Primary content. */
  children: PropTypes.node,

  /** Additional classes. */
  className: PropTypes.string,

  /** Shorthand for primary content. */
  content: PropTypes.node
};

MessageHeader.create = createShorthandFactory(MessageHeader, val => ({ content: val }));

export default MessageHeader;
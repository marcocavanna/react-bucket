import React from 'react';
import PropTypes from 'prop-types';
import cx from 'classnames';

import {
  childrenUtils,
  getElementType,
  getUnhandledProps
} from '../../lib';

/**
 * A message can contain a content.
 */
function MessageContent(props) {

  const {
    children,
    className,
    content
  } = props;

  const classes = cx('content', className);

  const rest = getUnhandledProps(MessageContent, props);
  const ElementType = getElementType(MessageContent, props);

  return (
    <ElementType {...rest} className={classes}>
      {childrenUtils.isNil(children) ? content : children}
    </ElementType>
  );
}

MessageContent.propTypes = {
  /** An element type to render as (string or function). */
  as: PropTypes.elementType,

  /** Primary content. */
  children: PropTypes.node,

  /** Additional classes. */
  className: PropTypes.string,

  /** Shorthand for primary content. */
  content: PropTypes.node
};

export default MessageContent;

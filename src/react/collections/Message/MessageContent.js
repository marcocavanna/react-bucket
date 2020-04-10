import React from 'react';
import PropTypes from 'prop-types';
import cx from 'classnames';

import {
  childrenUtils,
  getElementType,
  getUnhandledProps,
  createHTMLParagraph,
  classByKey
} from '../../lib';

import MessageHeader from './MessageHeader';
import MessageList from './MessageList';

/**
 * A message can contain a content.
 */
function MessageContent(props) {

  const {
    children,
    className,
    content,
    header,
    list
  } = props;

  const classes = cx(
    'content',
    classByKey(header, 'has-header'),
    classByKey(!!(content || children), 'has-content'),
    classByKey(list, 'has-list'),
    className
  );

  const rest = getUnhandledProps(MessageContent, props);
  const ElementType = getElementType(MessageContent, props);

  if (!childrenUtils.isNil(children)) {
    return (
      <ElementType {...rest} className={classes}>
        {children}
      </ElementType>
    );
  }

  if (!header && !content && !list) {
    return null;
  }

  return (
    <ElementType {...rest} className={classes}>
      {header && MessageHeader.create(header, { autoGenerateKey: false })}
      {content && createHTMLParagraph(content, { autoGenerateKey: false })}
      {list && MessageList.create(list, { autoGenerateKey: false })}
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
  content: PropTypes.node,

  /** Header Shorthand Props */
  header: PropTypes.any,

  /** List shorthand props */
  list: PropTypes.any
};

export default MessageContent;

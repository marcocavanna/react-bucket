import React from 'react';
import PropTypes from 'prop-types';
import cx from 'classnames';

import _ from 'lodash';

import {
  childrenUtils,
  createShorthandFactory,
  getElementType,
  getUnhandledProps
} from '../../lib';
import MessageItem from './MessageItem';

/**
 * A message can contain a list of items.
 */
function MessageList(props) {

  const {
    children,
    className,
    items
  } = props;

  const classes = cx('list', className);

  const rest = getUnhandledProps(MessageList, props);
  const ElementType = getElementType(MessageList, props);

  return (
    <ElementType {...rest} className={classes}>
      {childrenUtils.isNil(children)
        ? _.map(items, val => MessageItem.create(val, { autoGenerateKey: true }))
        : children}
    </ElementType>
  );
}

MessageList.propTypes = {
  /** An element type to render as (string or function). */
  as: PropTypes.elementType,

  /** Primary content. */
  children: PropTypes.node,

  /** Additional classes. */
  className: PropTypes.string,

  /** Shorthand Message.Items. */
  items: PropTypes.any
};

MessageList.defaultProps = {
  as: 'ul'
};

MessageList.create = createShorthandFactory(MessageList, val => ({ items: val }));

export default MessageList;

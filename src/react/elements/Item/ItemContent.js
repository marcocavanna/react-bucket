import React from 'react';
import PropTypes from 'prop-types';
import cx from 'classnames';

import ItemHeader from './ItemHeader';

import {
  customPropTypes,
  childrenUtils,
  createShorthandFactory,
  getElementType,
  getUnhandledProps,
  classByKey
} from '../../lib';

function ItemContent(props) {

  const {
    children,
    className,
    content,
    header,
    notTruncated
  } = props;

  const classes = cx(
    className,
    classByKey(notTruncated, 'is-not-truncated'),
    'item-content'
  );

  const ElementType = getElementType(ItemContent, props);
  const rest = getUnhandledProps(ItemContent, props);

  if (childrenUtils.isNil(children)) {
    return (
      <ElementType {...rest} className={classes}>
        {header && ItemHeader.create(header, { autoGenerateKey: false })}
        <div className='item-text'>{content}</div>
      </ElementType>
    );
  }

  return (
    <ElementType {...rest} className={classes}>
      {children}
    </ElementType>
  );

}

ItemContent.propTypes = {
  /** An element used to render the component */
  as: customPropTypes.as,

  /** User Defined Classes */
  className: PropTypes.string,

  /** Content shorthand */
  content: PropTypes.any,

  /** Header Shorthand */
  header: PropTypes.any,

  /** Truncated Content */
  notTruncated: PropTypes.bool
};

ItemContent.create = createShorthandFactory(ItemContent, content => ({ content }));

export default ItemContent;

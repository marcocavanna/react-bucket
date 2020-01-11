import React from 'react';
import PropTypes from 'prop-types';
import cx from 'classnames';

import {
  getElementType,
  getUnhandledProps,
  childrenUtils,
  createShorthandFactory,
  classByKey
} from '../../lib';

function ItemMeta(props) {

  const {
    children,
    className,
    content,
    divided
  } = props;

  const classes = cx(
    'item-meta',
    classByKey(divided, 'is-divided'),
    className
  );

  const ElementType = getElementType(ItemMeta, props);
  const rest = getUnhandledProps(ItemMeta, props);

  return (
    <ElementType {...rest} className={classes}>
      {childrenUtils.isNil(children) ? content : children}
    </ElementType>
  );

}

ItemMeta.propTypes = {
  /** An element used to render the component */
  as: PropTypes.elementType,

  /** Primary content. */
  children: PropTypes.node,

  /** User Defined Classes */
  className: PropTypes.string,

  /** Content shorthand */
  content: PropTypes.node,

  /** Apply a dividing border */
  divided: PropTypes.bool
};

ItemMeta.create = createShorthandFactory(ItemMeta, content => ({ content }));

export default ItemMeta;

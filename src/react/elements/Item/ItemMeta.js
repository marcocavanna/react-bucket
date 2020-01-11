import React from 'react';
import PropTypes from 'prop-types';
import cx from 'classnames';

import {
  getElementType,
  getUnhandledProps,
  childrenUtils,
  createShorthandFactory
} from '../../lib';

function ItemMeta(props) {

  const {
    children,
    className,
    content
  } = props;

  const classes = cx(
    'item-meta',
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
  content: PropTypes.node
};

ItemMeta.create = createShorthandFactory(ItemMeta, content => ({ content }));

export default ItemMeta;

import React from 'react';
import PropTypes from 'prop-types';
import cx from 'classnames';

import _ from 'lodash';

import {
  childrenUtils,
  getElementType,
  getUnhandledProps,
  classByKey
} from '../../lib';

import Item from './Item';
import ItemSection from './ItemSection';

function ItemGroup(props) {

  const {
    children,
    className,
    clickableItems,
    divided,
    items,
    section
  } = props;

  const classes = cx(
    classByKey(divided, 'are-divided'),
    classByKey(clickableItems, 'items-are-clickable'),
    className,
    'items'
  );

  const rest = getUnhandledProps(ItemGroup, props);
  const ElementType = getElementType(ItemGroup, props);

  return (
    <ElementType {...rest} className={classes}>
      {section && ItemSection.create(section, { autoGenerateKey: true })}
      {childrenUtils.isNil(children)
        ? (_.isArray(items) && items.map(item => Item.create(item, { autoGenerateKey: true })))
        : children}
    </ElementType>
  );

}

ItemGroup.propTypes = {
  /** An Element used to Render the Component */
  as: PropTypes.elementType,

  /** Primary content. */
  children: PropTypes.node,

  /** User Defined Classes */
  className: PropTypes.string,

  /** Set Items as Clickable */
  clickableItems: PropTypes.bool,

  /** Divided */
  divided: PropTypes.bool,

  /** Items shorthand */
  items: PropTypes.array,

  /** Item Section Shorthand */
  section: PropTypes.node

};

export default ItemGroup;

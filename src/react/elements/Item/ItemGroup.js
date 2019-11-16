import React from 'react';
import PropTypes from 'prop-types';
import cx from 'classnames';

import _ from 'lodash';

import {
  childrenUtils,
  customPropTypes,
  getElementType,
  getUnhandledProps,
  classByKey
} from '../../lib';

import Item from './Item';

function ItemGroup(props) {

  const {
    children,
    className,
    clickableItems,
    divided,
    items
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
      {childrenUtils.isNil(children)
        ? (_.isArray(items) && items.map(Item.create))
        : children}
    </ElementType>
  );

}

ItemGroup.propTypes = {
  /** An Element used to Render the Component */
  as: customPropTypes.as,

  /** User Defined Classes */
  className: PropTypes.string,

  /** Set Items as Clickable */
  clickableItems: PropTypes.bool,

  /** Divided */
  divided: PropTypes.bool,

  /** Items shorthand */
  items: PropTypes.array

};

export default ItemGroup;

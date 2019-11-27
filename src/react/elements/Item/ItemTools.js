import React from 'react';
import PropTypes from 'prop-types';
import cx from 'classnames';

import _ from 'lodash';

import {
  childrenUtils,
  getElementType,
  getUnhandledProps,
  createShorthandFactory
} from '../../lib';

import ItemTool from './ItemTool';

function ItemTools(props) {

  const {
    children,
    className,
    tools
  } = props;

  const classes = cx(
    className,
    'item-tools'
  );

  const ElementType = getElementType(ItemTools, props);
  const rest = getUnhandledProps(ItemTools, props);

  return (
    <ElementType {...rest} className={classes}>
      {childrenUtils.isNil(children)
        ? _.isArray(tools) && tools.map(ItemTool.create)
        : children}
    </ElementType>
  );

}

ItemTools.propTypes = {
  /** An element used to render the component */
  as: PropTypes.elementType,

  /** User Defined Classes */
  className: PropTypes.string,

  /** Tools Shorthand */
  tools: PropTypes.array
};

ItemTools.create = createShorthandFactory(ItemTools, tools => ({ tools }));

export default ItemTools;

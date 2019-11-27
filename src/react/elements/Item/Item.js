import React from 'react';
import PropTypes from 'prop-types';
import cx from 'classnames';


import _ from 'lodash';
import {
  childrenUtils,
  getElementType,
  getUnhandledProps,
  createShorthandFactory,
  classByKey,
  classByPattern
} from '../../lib';

import ItemAvatar from './ItemAvatar';
import ItemContent from './ItemContent';
import ItemHeader from './ItemHeader';
import ItemTools from './ItemTools';
import ItemTool from './ItemTool';

function Item(props) {

  const {
    active,
    avatar,
    children,
    className,
    content,
    disabled,
    header,
    onClick,
    tools
  } = props;

  const classes = cx(
    classByKey(active === true, 'is-active'),
    classByPattern(typeof active === 'string' && active, 'is-active-as-%value%'),
    classByKey(disabled, 'is-disabled'),
    classByKey(onClick, 'is-clickable'),
    className,
    'item'
  );

  const ElementType = getElementType(Item, props);
  const rest = getUnhandledProps(Item, props);

  const handleClick = (e) => {
    if (disabled) {
      return;
    }
    _.invoke(props, 'onClick', e, props);
  };

  return (
    <ElementType {...rest} className={classes} onClick={handleClick}>
      {avatar && ItemAvatar.create(avatar, { autoGenerateKey: false })}
      {
        !childrenUtils.isNil(children)
          ? children
          : (header || content) && <ItemContent content={content} header={header} />
      }
      {tools && ItemTools.create(tools)}
    </ElementType>
  );

}

Item.propTypes = {
  /** Active State */
  active: PropTypes.oneOfType([
    PropTypes.bool,
    PropTypes.oneOf(['primary', 'secondary', 'success', 'danger', 'warning'])
  ]),

  /** An Element used to Render the Component */
  as: PropTypes.elementType,

  /** Avatar Properties Shorthand */
  avatar: PropTypes.object,

  /** User Defined Classes */
  className: PropTypes.string,

  /** Content Shorthand */
  content: PropTypes.any,

  /** Disabled State */
  disabled: PropTypes.bool,

  /** Header Shorthand */
  header: PropTypes.any,

  /** On Click Function */
  onClick: PropTypes.func,

  /** Tools shorthand Factory */
  tools: PropTypes.array
};

Item.Avatar = ItemAvatar;
Item.Header = ItemHeader;
Item.Content = ItemContent;
Item.Tool = ItemTool;
Item.Tools = ItemTools;

Item.create = createShorthandFactory(Item, props => props);

export default Item;

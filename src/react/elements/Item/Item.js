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
import ItemMeta from './ItemMeta';
import ItemSection from './ItemSection';
import ItemTools from './ItemTools';
import ItemTool from './ItemTool';

function Item(props) {

  const {
    active,
    avatar,
    children,
    className,
    content,
    meta,
    disabled,
    header,
    onClick,
    sortable,
    tools
  } = props;

  const classes = cx(
    classByKey(active === true, 'is-active'),
    classByPattern(typeof active === 'string' && active, 'is-active-as-%value%'),
    classByKey(disabled, 'is-disabled'),
    classByKey(onClick, 'is-clickable'),
    classByKey(sortable, 'is-sortable'),
    classByKey(meta, 'has-meta'),
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
          : (header || content || meta) && (
            <ItemContent content={content} header={header} meta={meta} />
          )
      }
      {tools && ItemTools.create(tools, { autoGenerateKey: false })}
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

  /** Primary content. */
  children: PropTypes.node,

  /** User Defined Classes */
  className: PropTypes.string,

  /** Content Shorthand */
  content: PropTypes.node,

  /** Disabled State */
  disabled: PropTypes.bool,

  /** Header Shorthand */
  header: PropTypes.any,

  /** Meta Shorthand */
  meta: PropTypes.oneOfType([
    PropTypes.node,
    PropTypes.bool
  ]),

  /**
   * Called after user's click.
   * @param {SyntheticEvent} event - React's original SyntheticEvent.
   * @param {object} data - All props.
   */
  onClick: PropTypes.func,

  /** Set the item as sortable */
  sortable: PropTypes.bool,

  /** Tools shorthand Factory */
  tools: PropTypes.array
};

Item.Avatar = ItemAvatar;
Item.Header = ItemHeader;
Item.Content = ItemContent;
Item.Meta = ItemMeta;
Item.Section = ItemSection;
Item.Tool = ItemTool;
Item.Tools = ItemTools;

Item.create = createShorthandFactory(Item, props => props);

export default Item;

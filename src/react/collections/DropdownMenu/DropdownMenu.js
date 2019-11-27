import React, { useState } from 'react';
import PropTypes from 'prop-types';
import cx from 'classnames';

import _ from 'lodash';

import {
  childrenUtils,
  getElementType,
  getUnhandledProps,
  createShorthandFactory
} from '../../lib';

import Popup from '../../modules/Popup';
import Button from '../../elements/Button';

import MenuItem from '../Menu/MenuItem';

function DropdownMenu(props) {

  const {
    children,
    className,
    content,
    items,
    trigger
  } = props;

  const classes = cx(
    'dropdown',
    className
  );

  const [isOpen, setOpen] = useState(false);

  const handleTriggerClick = () => {
    setOpen(!isOpen);
  };

  const handleDocumentClick = () => {
    if (!isOpen) return;
    setOpen(false);
  };

  const handleMenuOpen = (e) => {
    _.invoke(props, 'onOpen', e, props);
  };

  const handleMenuClose = (e) => {
    _.invoke(props, 'onClose', e, props);
  };

  const handlePortalClick = () => {
    setOpen(false);
  };

  const rest = getUnhandledProps(DropdownMenu, props);
  const ElementType = getElementType(DropdownMenu, props);

  const triggerElement = React.cloneElement(trigger, {
    onClick: handleTriggerClick
  });

  return (
    <React.Fragment>
      <Popup
        open={isOpen}
        basic={false}
        inverted={false}
        trigger={triggerElement}
        on='click'
        position='bottom right'
        content={(
          <ElementType {...rest} className={classes}>
            {
              Array.isArray(items)
                ? items.map(item => MenuItem.create(item, {
                  overrideProps: ({ onClick, ...itemRest }) => ({
                    onClick: (...args) => {
                      if (typeof onClick === 'function') {
                        onClick(...args);
                      }
                      return handlePortalClick();
                    },
                    ...itemRest
                  })
                }))
                : childrenUtils.isNil(children) ? content : children
            }
          </ElementType>
        )}
        onOutsideClick={handleDocumentClick}
        onOpen={handleMenuOpen}
        onClose={handleMenuClose}
      />
    </React.Fragment>
  );

}

DropdownMenu.propTypes = {
  /** An element used to render the component */
  as: PropTypes.elementType,

  /** Children Content */
  children: PropTypes.node,

  /** User defined classname */
  className: PropTypes.string,

  /** Content Shorthand */
  content: PropTypes.node,

  /** Event Stack name */
  eventStack: PropTypes.string,

  /** Items Shorthand */
  items: PropTypes.array,

  /** On Menu Close Handler */
  onClose: PropTypes.func,

  /** On Menu Open Handler */
  onOpen: PropTypes.func,

  /** Trigger Element */
  trigger: PropTypes.element
};

DropdownMenu.defaultProps = {
  eventStack : 'default',
  trigger    : <Button flat icon='ellipsis h' />
};

DropdownMenu.create = createShorthandFactory(DropdownMenu, content => ({ content }));

export default DropdownMenu;

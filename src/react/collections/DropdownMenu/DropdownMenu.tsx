import * as React from 'react';
import clsx from 'clsx';

import {
  childrenUtils
} from '@appbuckets/react-ui-core';
import { Button } from '../../elements/Button';

import {
  useElementType
} from '../../lib';

import { useAutoControlledValue } from '../../hooks/useAutoControlledValue';

import { Popup } from '../../modules/Popup';

import MenuItem from '../Menu/MenuItem';
import { MenuItemProps } from '../Menu/MenuItem.types';

import { DropdownMenuProps } from './DropdownMenu.types';


/* --------
 * Component Declare
 * -------- */
type DropdownMenuComponent = React.FunctionComponent<DropdownMenuProps>;


/* --------
 * Component Render
 * -------- */
const DropdownMenu: DropdownMenuComponent = (props) => {

  const {
    as,
    basic,
    children,
    className,
    closeOnItemClicked,
    content,
    defaultOpen: userDefinedDefaultOpen,
    inverted,
    items,
    onClose,
    onItemClick,
    onOpen,
    openOn,
    open       : userDefinedOpen,
    position,
    trigger,
    ...rest
  } = props;

  const ElementType = useElementType(DropdownMenu, props);

  const [ open, trySetOpen ] = useAutoControlledValue(false, {
    defaultProp: userDefinedDefaultOpen,
    prop       : userDefinedOpen
  });

  const classes = clsx(
    'dropdown',
    className
  );


  // ----
  // Handlers
  // ----
  const handleMenuOpen = (e: React.MouseEvent<HTMLElement>) => {
    if (typeof onOpen === 'function') {
      onOpen(e, { ...props, open: true });
    }

    trySetOpen(true);
  };

  const handleMenuClose = (e: React.MouseEvent<HTMLElement>) => {
    if (typeof onClose === 'function') {
      onClose(e, { ...props, open: false });
    }

    trySetOpen(false);
  };


  // ----
  // Trigger Element
  // ----
  const triggerElement = Button.create(trigger, {
    autoGenerateKey: false,
    overrideProps  : (defaultProps) => ({
      onClick: (event, buttonProps) => {
        /** Call user defined handler */
        if (defaultProps.onClick) {
          defaultProps.onClick(event, buttonProps);
        }

        /** On trigger click toggle menu */
        if (open) {
          handleMenuClose(event);
        }
        else {
          handleMenuOpen(event);
        }
      }
    })
  });


  // ----
  // Component Render
  // ----
  return (
    <Popup
      className={'dropdown-container'}
      portalProps={{
        open,
        closeOnDocumentClick: true
      }}
      basic={basic}
      inverted={inverted}
      trigger={triggerElement}
      openOn={openOn}
      position={position}
      onOpen={handleMenuOpen}
      onClose={handleMenuClose}
      content={(
        <ElementType {...rest} className={classes}>
          {
            Array.isArray(items)
              ? items.map((item) => (
                MenuItem.create(item, {
                  autoGenerateKey: true,
                  overrideProps  : ({ onClick, ...itemRest }) => ({
                    onClick: (e: React.MouseEvent<HTMLElement>, itemProps: MenuItemProps) => {
                      /** Call defined itemClick handler */
                      if (typeof onItemClick === 'function') {
                        onItemClick(e, itemProps);
                      }

                      /** Call menu item click handler */
                      if (onClick) {
                        onClick(e, itemProps);
                      }

                      /** Check if must close the menu */
                      if (closeOnItemClicked) {
                        handleMenuClose(e);
                      }
                    },
                    ...itemRest
                  })
                })
              ))
              : childrenUtils.isNil(children) ? content : children
          }
        </ElementType>
      )}
    />
  );

};

DropdownMenu.displayName = 'DropdownMenu';

DropdownMenu.defaultProps = {
  basic             : false,
  closeOnItemClicked: true,
  inverted          : false,
  openOn            : [ 'click' ],
  position          : 'bottom right'
};

export default DropdownMenu;

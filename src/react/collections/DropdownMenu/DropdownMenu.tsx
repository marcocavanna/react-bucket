import * as React from 'react';
import clsx from 'clsx';

import {
  useElementType
} from '../../lib';

import { useAutoControlledValue } from '../../hooks/useAutoControlledValue';
import { useWithDefaultProps } from '../../context/BucketContext';

import { Button } from '../../elements/Button';

import { Popup } from '../../modules/Popup';

import Menu from '../Menu/Menu';
import { MenuItemProps } from '../Menu/MenuItem.types';

import { DropdownMenuProps } from './DropdownMenu.types';


/* --------
 * Component Declare
 * -------- */
type DropdownMenuComponent = React.FunctionComponent<DropdownMenuProps>;


/* --------
 * Component Render
 * -------- */
const DropdownMenu: DropdownMenuComponent = (receivedProps) => {

  const props = useWithDefaultProps('dropdownMenu', receivedProps);

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
    open: userDefinedOpen,
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
    open && 'open',
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
  }) ?? undefined;


  // ----
  // On Item Click Handlers
  // ----
  const handleMenuItemClick = (event: React.MouseEvent<HTMLElement>, itemProps: MenuItemProps) => {
    /** If a user defined handler for click on menu item exists, call it */
    if (typeof onItemClick === 'function') {
      onItemClick(event, itemProps);
    }

    /** If the menu must be close on item click, call the handleCloseMenu */
    if (closeOnItemClicked) {
      handleMenuClose(event);
    }
  };


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
        <Menu
          avoidActive
          text
          vertical
          {...rest}
          as={ElementType}
          className={classes}
          items={items}
          onItemClick={handleMenuItemClick}
        >
          {children}
        </Menu>
        // <ElementType {...rest} className={classes}>
        //   {
        //     Array.isArray(items)
        //       ? items.map((item) => (
        //         MenuItem.create(item, {
        //           autoGenerateKey: true,
        //           overrideProps  : ({ onClick, ...itemRest }) => ({
        //             onClick: (e: React.MouseEvent<HTMLElement>, itemProps: MenuItemProps) => {
        //               /** Call defined itemClick handler */
        //               if (typeof onItemClick === 'function') {
        //                 onItemClick(e, itemProps);
        //               }
        //
        //               /** Call menu item click handler */
        //               if (onClick) {
        //                 onClick(e, itemProps);
        //               }
        //
        //               /** Check if must close the menu */
        //               if (closeOnItemClicked) {
        //                 handleMenuClose(e);
        //               }
        //             },
        //             ...itemRest
        //           })
        //         })
        //       ))
        //       : childrenUtils.isNil(children) ? content : children
        //   }
        // </ElementType>
      )}
    />
  );

};

DropdownMenu.displayName = 'DropdownMenu';

export default DropdownMenu;

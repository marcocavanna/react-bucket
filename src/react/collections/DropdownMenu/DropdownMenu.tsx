import * as React from 'react';
import clsx from 'clsx';

import {
  childrenUtils
} from '@appbuckets/react-ui-core';

import {
  useElementType
} from '../../lib';

import { DropdownMenuProps } from './DropdownMenu.types';
import { Popup } from '../../modules/Popup';
import MenuItem from '../Menu/MenuItem';
import { MenuItemProps } from '../Menu/MenuItem.types';


export default function DropdownMenu(props: DropdownMenuProps): React.ReactElement<DropdownMenuProps> {

  const {
    as,
    children,
    className,
    content,
    items,
    onClose,
    onItemClick,
    onOpen,
    trigger,
    ...rest
  } = props;

  const ElementType = useElementType(DropdownMenu, props);

  const [ isOpen, setOpen ] = React.useState<boolean>(false);

  const classes = clsx(
    'dropdown',
    className
  );


  // ----
  // Handlers
  // ----
  const handleTriggerClick = React.useCallback(
    () => {
      setOpen(!isOpen);
    },
    [
      isOpen
    ]
  );

  const handleMenuOpen = React.useCallback(
    (e: React.MouseEvent<HTMLElement>) => {
      if (typeof onOpen === 'function') {
        onOpen(e, props);
      }
    },
    [
      onOpen
    ]
  );

  const handleMenuClose = React.useCallback(
    (e: React.MouseEvent<HTMLElement>) => {
      setOpen(false);

      if (typeof onClose === 'function') {
        onClose(e, props);
      }
    },
    [
      onClose,
      isOpen
    ]
  );

  const handlePortalClick = React.useCallback(
    () => {
      setOpen(false);
    },
    []
  );


  // ----
  // Trigger Element
  // ----
  const triggerElement = React.useMemo(
    () => {
      if (!trigger) {
        return null;
      }

      return React.cloneElement(trigger, {
        onClick: handleTriggerClick
      });
    },
    [ trigger, isOpen ]
  );


  // ----
  // Component Render
  // ----
  return (
    <Popup
      portalProps={{
        open                : isOpen,
        closeOnDocumentClick: true
      }}
      basic={false}
      inverted={false}
      trigger={triggerElement}
      openOn={[ 'click' ]}
      position={'bottom right'}
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
                      if (typeof onItemClick === 'function') {
                        onItemClick(e, itemProps);
                      }

                      return handlePortalClick();
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

}

DropdownMenu.displayName = 'DropdownMenu';

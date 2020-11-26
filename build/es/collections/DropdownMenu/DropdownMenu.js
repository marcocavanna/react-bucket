'use strict';

var _tslib = require('../../_virtual/_tslib.js');
var React = require('react');
var clsx = require('clsx');
var reactUiCore = require('@appbuckets/react-ui-core');
var customHook = require('../../lib/customHook.js');
require('tiny-invariant');
require('../../elements/Button/ButtonGroup.js');
var Popup = require('../../modules/Popup/Popup.js');
var Button = require('../../elements/Button/Button.js');
var useAutoControlledValue = require('../../hooks/useAutoControlledValue.js');
var MenuItem = require('../Menu/MenuItem.js');

function _interopDefaultLegacy(e) {
  return e && typeof e === 'object' && 'default' in e ? e : { default: e };
}

var clsx__default = /*#__PURE__*/ _interopDefaultLegacy(clsx);

/* --------
 * Component Render
 * -------- */
var DropdownMenu = function (props) {
  var _a;
  var as = props.as,
    basic = props.basic,
    children = props.children,
    className = props.className,
    closeOnItemClicked = props.closeOnItemClicked,
    content = props.content,
    userDefinedDefaultOpen = props.defaultOpen,
    inverted = props.inverted,
    items = props.items,
    onClose = props.onClose,
    onItemClick = props.onItemClick,
    onOpen = props.onOpen,
    openOn = props.openOn,
    userDefinedOpen = props.open,
    position = props.position,
    trigger = props.trigger,
    rest = _tslib.__rest(props, [
      'as',
      'basic',
      'children',
      'className',
      'closeOnItemClicked',
      'content',
      'defaultOpen',
      'inverted',
      'items',
      'onClose',
      'onItemClick',
      'onOpen',
      'openOn',
      'open',
      'position',
      'trigger',
    ]);
  var ElementType = customHook.useElementType(DropdownMenu, props);
  var _b = useAutoControlledValue.useAutoControlledValue(false, {
      defaultProp: userDefinedDefaultOpen,
      prop: userDefinedOpen,
    }),
    open = _b[0],
    trySetOpen = _b[1];
  var classes = clsx__default['default']('dropdown', className);
  // ----
  // Handlers
  // ----
  var handleMenuOpen = function (e) {
    if (typeof onOpen === 'function') {
      onOpen(e, _tslib.__assign(_tslib.__assign({}, props), { open: true }));
    }
    trySetOpen(true);
  };
  var handleMenuClose = function (e) {
    if (typeof onClose === 'function') {
      onClose(e, _tslib.__assign(_tslib.__assign({}, props), { open: false }));
    }
    trySetOpen(false);
  };
  // ----
  // Trigger Element
  // ----
  var triggerElement =
    (_a = Button.create(trigger, {
      autoGenerateKey: false,
      overrideProps: function (defaultProps) {
        return {
          onClick: function (event, buttonProps) {
            /** Call user defined handler */
            if (defaultProps.onClick) {
              defaultProps.onClick(event, buttonProps);
            }
            /** On trigger click toggle menu */
            if (open) {
              handleMenuClose(event);
            } else {
              handleMenuOpen(event);
            }
          },
        };
      },
    })) !== null && _a !== void 0
      ? _a
      : undefined;
  // ----
  // Component Render
  // ----
  return React.createElement(Popup, {
    className: 'dropdown-container',
    portalProps: {
      open: open,
      closeOnDocumentClick: true,
    },
    basic: basic,
    inverted: inverted,
    trigger: triggerElement,
    openOn: openOn,
    position: position,
    onOpen: handleMenuOpen,
    onClose: handleMenuClose,
    content: React.createElement(
      ElementType,
      _tslib.__assign({}, rest, { className: classes }),
      Array.isArray(items)
        ? items.map(function (item) {
            return MenuItem.create(item, {
              autoGenerateKey: true,
              overrideProps: function (_a) {
                var onClick = _a.onClick,
                  itemRest = _tslib.__rest(_a, ['onClick']);
                return _tslib.__assign(
                  {
                    onClick: function (e, itemProps) {
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
                  },
                  itemRest
                );
              },
            });
          })
        : reactUiCore.childrenUtils.isNil(children)
        ? content
        : children
    ),
  });
};
DropdownMenu.displayName = 'DropdownMenu';
DropdownMenu.defaultProps = {
  basic: false,
  closeOnItemClicked: true,
  inverted: false,
  openOn: ['click'],
  position: 'bottom right',
};

module.exports = DropdownMenu;
//# sourceMappingURL=DropdownMenu.js.map

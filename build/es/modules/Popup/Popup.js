'use strict';

var _tslib = require('../../_virtual/_tslib.js');
var React = require('react');
var clsx = require('clsx');
var reactUiCore = require('@appbuckets/react-ui-core');
var customHook = require('../../lib/customHook.js');
require('tiny-invariant');
var EventStack = require('@semantic-ui-react/event-stack');
var reactPopper = require('react-popper');
var internalHooks = require('./lib/internalHooks.js');
var Header = require('../../elements/Header/Header.js');

function _interopDefaultLegacy(e) {
  return e && typeof e === 'object' && 'default' in e ? e : { default: e };
}

var clsx__default = /*#__PURE__*/ _interopDefaultLegacy(clsx);
var EventStack__default = /*#__PURE__*/ _interopDefaultLegacy(EventStack);

/* --------
 * Component Render
 * -------- */
var Popup = function (props) {
  // ----
  // Destructuring Props
  // ----
  var _a = customHook.useSharedClassName(props),
    className = _a.className,
    _b = _a.rest,
    children = _b.children,
    content = _b.content,
    basic = _b.basic,
    disabled = _b.disabled,
    hideOnScroll = _b.hideOnScroll,
    hideOnScrollDelay = _b.hideOnScrollDelay,
    hoverable = _b.hoverable,
    inverted = _b.inverted,
    offset = _b.offset,
    onClose = _b.onClose,
    onMount = _b.onMount,
    onOpen = _b.onOpen,
    onUnmount = _b.onUnmount,
    position = _b.position,
    userDefinedPopperModifiers = _b.popperModifiers,
    userDefinedPortalProps = _b.portalProps,
    updateDependencies = _b.updateDependencies,
    trigger = _b.trigger,
    userDefinedStyle = _b.style,
    rest = _tslib.__rest(_b, [
      'children',
      'content',
      'basic',
      'disabled',
      'hideOnScroll',
      'hideOnScrollDelay',
      'hoverable',
      'inverted',
      'offset',
      'onClose',
      'onMount',
      'onOpen',
      'onOutsideClick',
      'onUnmount',
      'openOn',
      'position',
      'popperModifiers',
      'portalProps',
      'updateDependencies',
      'trigger',
      'style',
    ]);
  // ----
  // Reference Handling
  // ----
  var _c = React.useState(),
    referenceElement = _c[0],
    setReferenceElement = _c[1];
  var _d = React.useState(),
    popperElement = _d[0],
    setPopperElement = _d[1];
  // ----
  // Internal State Definition
  // ----
  var _e = React.useState(false),
    closed = _e[0],
    setClosed = _e[1];
  var _f = React.useState(),
    closeTimeout = _f[0],
    setCloseTimeout = _f[1];
  // ----
  // Popper Building
  // ----
  var popperModifiers = internalHooks.usePopperModifiers(
    [
      { name: 'arrow', enabled: false },
      { name: 'offset', enabled: !!offset, options: { offset: offset } },
      { name: 'preventOverflow', enabled: false },
    ],
    userDefinedPopperModifiers !== null && userDefinedPopperModifiers !== void 0
      ? userDefinedPopperModifiers
      : [],
    [offset]
  );
  /** Get Popper Placement using Position */
  var popperPlacement = internalHooks.usePopperPlacementMapping(position);
  var _g = reactPopper.usePopper(referenceElement, popperElement, {
      modifiers: popperModifiers,
      placement: popperPlacement,
    }),
    popperStyle = _g.styles,
    attributes = _g.attributes,
    scheduleUpdate = _g.update;
  // ----
  // Component LifeCycle Hooks
  // ----
  React.useEffect(
    function () {
      /** On Dependencies Update, reload Position */
      if (scheduleUpdate) {
        scheduleUpdate();
      }
    },
    // eslint-disable-next-line
    updateDependencies
      ? _tslib.__spreadArrays([scheduleUpdate], updateDependencies)
      : [scheduleUpdate, true]
  );
  React.useEffect(
    function () {
      return function () {
        /** On Component Unmount, clear close Timer */
        if (closeTimeout) {
          clearTimeout(closeTimeout);
        }
      };
    },
    [closeTimeout]
  );
  // ----
  // Component Internal Hooks
  // ----
  var ElementType = customHook.useElementType(Popup, props);
  var portalProps = internalHooks.usePortalProps(userDefinedPortalProps, props);
  // ----
  // Avoid Component Render if Popup is Closed or Disabled
  // ----
  if (closed || disabled) {
    return trigger !== null && trigger !== void 0 ? trigger : null;
  }
  // ----
  // Portal Event Handling
  // ----
  var handlePortalClose = function (event) {
    if (typeof onClose === 'function') {
      onClose(event, props);
    }
  };
  var handlePortalMount = function () {
    if (typeof onMount === 'function') {
      onMount(null, props);
    }
  };
  var handlePortalOpen = function (event) {
    if (typeof onOpen === 'function') {
      onOpen(event, props);
    }
  };
  var handlePortalUnmount = function () {
    if (typeof onUnmount === 'function') {
      onUnmount(null, props);
    }
  };
  var handlePopupClick = function (event) {
    if (!basic && !inverted) {
      event.stopPropagation();
    }
  };
  // ----
  // Scroll Handler
  // ----
  var handleHideOnScroll = function (event) {
    setClosed(true);
    EventStack.instance.unsub('scroll', handleHideOnScroll, {
      target: 'window',
    });
    setCloseTimeout(
      setTimeout(function () {
        setClosed(false);
      }, hideOnScrollDelay)
    );
    handlePortalClose(event);
  };
  // ----
  // Popup Content Build
  // ----
  var style = _tslib.__assign(
    _tslib.__assign({ left: 'auto', right: 'auto' }, popperStyle.popper),
    userDefinedStyle
  );
  var classes = clsx__default['default'](
    'visible',
    { inverted: inverted, basic: basic, hoverable: hoverable },
    position,
    'popup',
    className
  );
  /** Build Content */
  var popupContent = React.createElement(
    ElementType,
    _tslib.__assign(
      {},
      rest,
      {
        ref: setPopperElement,
        className: classes,
        style: style,
        onClick: handlePopupClick,
      },
      attributes.popper
    ),
    React.createElement(
      'div',
      { className: 'content' },
      reactUiCore.childrenUtils.isNil(children)
        ? Header.create(content, { autoGenerateKey: false })
        : children
    ),
    hideOnScroll &&
      React.createElement(EventStack__default['default'], {
        on: handleHideOnScroll,
        name: 'scroll',
        target: 'window',
      })
  );
  // ----
  // Component Render
  // ----
  return React.createElement(
    reactUiCore.Portal,
    _tslib.__assign({}, portalProps, {
      trigger: trigger,
      triggerRef: setReferenceElement,
      onClose: handlePortalClose,
      onMount: handlePortalMount,
      onOpen: handlePortalOpen,
      onUnmount: handlePortalUnmount,
    }),
    popupContent
  );
};
Popup.displayName = 'Popup';
Popup.defaultProps = {
  basic: true,
  inverted: true,
  hideOnScrollDelay: 50,
  offset: [0, 5],
  openOn: ['hover'],
  position: 'top center',
};

module.exports = Popup;
//# sourceMappingURL=Popup.js.map

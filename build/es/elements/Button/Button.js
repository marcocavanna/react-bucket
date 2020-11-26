'use strict';

var _tslib = require('../../_virtual/_tslib.js');
var React = require('react');
var clsx = require('clsx');
var reactUiCore = require('@appbuckets/react-ui-core');
var customHook = require('../../lib/customHook.js');
require('tiny-invariant');
var ButtonGroup = require('./ButtonGroup.js');
var Icon = require('../Icon/Icon.js');
var Popup = require('../../modules/Popup/Popup.js');

function _interopDefaultLegacy(e) {
  return e && typeof e === 'object' && 'default' in e ? e : { default: e };
}

var clsx__default = /*#__PURE__*/ _interopDefaultLegacy(clsx);

/* --------
 * Component Render
 * -------- */
var Button = function (props) {
  var _a = customHook.useSharedClassName(props),
    className = _a.className,
    _b = _a.rest,
    children = _b.children,
    content = _b.content,
    active = _b.active,
    disabled = _b.disabled,
    fab = _b.fab,
    fitted = _b.fitted,
    flat = _b.flat,
    full = _b.full,
    icon = _b.icon,
    iconPosition = _b.iconPosition,
    inverted = _b.inverted,
    loading = _b.loading,
    onClick = _b.onClick,
    role = _b.role,
    rounded = _b.rounded,
    userDefinedTabIndex = _b.tabIndex,
    toggle = _b.toggle,
    tooltip = _b.tooltip,
    type = _b.type,
    rawRest = _tslib.__rest(_b, [
      'children',
      'content',
      'active',
      'disabled',
      'fab',
      'fitted',
      'flat',
      'full',
      'icon',
      'iconPosition',
      'inverted',
      'loading',
      'onClick',
      'role',
      'rounded',
      'tabIndex',
      'toggle',
      'tooltip',
      'type',
    ]);
  /** Get the component element type */
  var ElementType = customHook.useElementType(Button, props);
  /** Split state className from rest props */
  var _c = customHook.useSplitStateClassName(rawRest),
    stateClasses = _c[0],
    rest = _c[1];
  /**
   * Compute the correct
   * button aria role based on button type
   */
  var ariaRole = React.useMemo(
    function () {
      /** If role is defined, return it */
      if (role != null) {
        return role;
      }
      /** If element is a button, return button */
      if (ElementType === 'button') {
        return 'button';
      }
      /** Else, return null */
      return null;
    },
    [role, ElementType]
  );
  /**
   * Compute the right tab index using
   * the disabled prop and/or the original
   * tabIndex property defined by user
   */
  var tabIndex = React.useMemo(
    function () {
      /** If tabIndex has been defined by user return it */
      if (userDefinedTabIndex != null) {
        return userDefinedTabIndex;
      }
      /** If component is disabled, strict tabIndex to -1 */
      if (disabled) {
        return -1;
      }
      /** If the element has been rendered as a 'div' element, return 0 */
      if (ElementType === 'div') {
        return 0;
      }
      /** Fallback to null */
      return null;
    },
    [userDefinedTabIndex, disabled, ElementType]
  );
  /** Build an handler for click event */
  var handleClick = function (e) {
    /** If button is disabled, prevent any click */
    if (disabled) {
      e.preventDefault();
      return;
    }
    /** If the onClick function exists, invoke it */
    if (typeof onClick === 'function') {
      /** Stop event Propagation */
      e.stopPropagation();
      onClick(e, props);
    }
  };
  /** Build the element class list */
  var classes = clsx__default['default'](
    {
      fab: fab && !content && !children,
      disabled: disabled,
      fitted: fitted,
      flat: flat,
      inverted: inverted,
      loading: loading,
      rounded: rounded,
      full: full,
      active: active,
      toggle: toggle,
      'with-icon': icon && (children || content),
      'as-icon': icon && !children && !content,
    },
    reactUiCore.classByPattern(
      icon && (children || content) && iconPosition,
      'icon-on-%value%'
    ),
    stateClasses,
    'button',
    className
  );
  /** Build the Button Element Props */
  var buttonProps = _tslib.__assign(_tslib.__assign({}, rest), {
    type: type,
    tabIndex: tabIndex,
    className: classes,
    disabled: (disabled && ElementType === 'button') || undefined,
    role: ariaRole,
    onClick: handleClick,
  });
  /** If there are children render them */
  if (!reactUiCore.childrenUtils.isNil(children)) {
    var buttonElementWithChildren = React.createElement(
      ElementType,
      _tslib.__assign({}, buttonProps),
      children
    );
    return tooltip
      ? React.createElement(Popup, {
          content: tooltip,
          trigger: buttonElementWithChildren,
        })
      : buttonElementWithChildren;
  }
  /** Build the icon if Exists */
  var iconElement = icon && Icon.create(icon, { autoGenerateKey: false });
  /** Else, build the button using shortHand */
  var buttonElement = React.createElement(
    ElementType,
    _tslib.__assign({}, rest, {
      className: classes,
      disabled: (disabled && ElementType === 'button') || undefined,
      role: ariaRole,
      type: type,
      tabIndex: tabIndex,
      onClick: handleClick,
    }),
    iconPosition === 'left' && iconElement,
    content,
    iconPosition === 'right' && iconElement
  );
  return tooltip
    ? React.createElement(Popup, { content: tooltip, trigger: buttonElement })
    : buttonElement;
};
/** Add the Group */
Button.Group = ButtonGroup;
/** Set button Default Props */
Button.defaultProps = {
  as: 'button',
  iconPosition: 'left',
  type: 'button',
};
/** Properly set Display Name */
Button.displayName = 'Button';
/** Create the Shorthand Factory Method */
Button.create = reactUiCore.createShorthandFactory(Button, function (content) {
  return { content: content };
});

module.exports = Button;
//# sourceMappingURL=Button.js.map

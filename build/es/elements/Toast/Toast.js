'use strict';

var _tslib = require('../../_virtual/_tslib.js');
var React = require('react');
var clsx = require('clsx');
var reactUiCore = require('@appbuckets/react-ui-core');
var customHook = require('../../lib/customHook.js');
require('tiny-invariant');
var Icon = require('../Icon/Icon.js');
var Header = require('../Header/Header.js');

function _interopDefaultLegacy(e) {
  return e && typeof e === 'object' && 'default' in e ? e : { default: e };
}

var clsx__default = /*#__PURE__*/ _interopDefaultLegacy(clsx);

/* --------
 * Component Render
 * -------- */
var Toast = function (props) {
  var _a = customHook.useSharedClassName(props),
    className = _a.className,
    _b = _a.rest,
    children = _b.children,
    content = _b.content,
    dismiss = _b.dismiss,
    dismissible = _b.dismissible,
    header = _b.header,
    icon = _b.icon,
    onClick = _b.onClick,
    rawRest = _tslib.__rest(_b, [
      'children',
      'content',
      'dismiss',
      'dismissible',
      'header',
      'icon',
      'onClick',
    ]);
  /** get the Element Type */
  var ElementType = customHook.useElementType(Toast, props);
  /** Split state className from rest props */
  var _c = customHook.useSplitStateClassName(rawRest),
    stateClassName = _c[0],
    rest = _c[1];
  /** Build classname */
  var classes = clsx__default['default'](
    'toast',
    typeof onClick === 'function' && 'clickable',
    stateClassName,
    className
  );
  /** Build Handlers */
  var handleClick = function (e) {
    if (typeof onClick === 'function') {
      onClick(e, props);
    }
  };
  var handleDismiss = React.useCallback(
    function (e) {
      /** Stop the Main Propagation of event */
      e.stopPropagation();
      if (typeof dismiss === 'function') {
        dismiss();
      }
    },
    [dismiss]
  );
  /* --------
   * Build the Toast Content using Shorthand
   * -------- */
  var toastContent = React.useMemo(
    function () {
      return Header.create(
        {
          content: header,
          subheader: content,
          icon: icon,
        },
        { autoGenerateKey: false }
      );
    },
    [header, content, icon]
  );
  var dismissIcon = React.useMemo(
    function () {
      return (
        dismissible &&
        (typeof dismissible === 'boolean'
          ? Icon.create(
              { name: 'times', onClick: handleDismiss },
              {
                autoGenerateKey: false,
                defaultProps: {
                  className: 'dismiss',
                },
                overrideProps: {
                  onClick: handleDismiss,
                },
              }
            )
          : Icon.create(dismissible, {
              autoGenerateKey: false,
              defaultProps: {
                className: 'dismiss',
              },
              overrideProps: {
                onClick: handleDismiss,
              },
            }))
      );
    },
    [dismissible, handleDismiss]
  );
  /* --------
   * If element has children, render them
   * -------- */
  if (!reactUiCore.childrenUtils.isNil(children)) {
    return React.createElement(
      ElementType,
      _tslib.__assign({}, rest, { className: classes, onClick: handleClick }),
      typeof children === 'function'
        ? children({ dismiss: handleDismiss })
        : children
    );
  }
  /* --------
   * Render the Component
   * -------- */
  return React.createElement(
    ElementType,
    _tslib.__assign({}, rest, { className: classes, onClick: handleClick }),
    toastContent,
    dismissIcon
  );
};
Toast.displayName = 'Toast';

module.exports = Toast;
//# sourceMappingURL=Toast.js.map

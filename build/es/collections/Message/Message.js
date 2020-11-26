'use strict';

var _tslib = require('../../_virtual/_tslib.js');
var React = require('react');
var clsx = require('clsx');
var reactUiCore = require('@appbuckets/react-ui-core');
var customHook = require('../../lib/customHook.js');
require('tiny-invariant');
var Icon = require('../../elements/Icon/Icon.js');
var Header = require('../../elements/Header/Header.js');

function _interopDefaultLegacy(e) {
  return e && typeof e === 'object' && 'default' in e ? e : { default: e };
}

var clsx__default = /*#__PURE__*/ _interopDefaultLegacy(clsx);

/* --------
 * Component Render
 * -------- */
var Message = function (props) {
  var _a = customHook.useSharedClassName(props),
    className = _a.className,
    _b = _a.rest,
    children = _b.children,
    content = _b.content,
    header = _b.header,
    icon = _b.icon,
    onDismiss = _b.onDismiss,
    rawRest = _tslib.__rest(_b, [
      'children',
      'content',
      'header',
      'icon',
      'onDismiss',
    ]);
  /** Get Proper Element type */
  var ElementType = customHook.useElementType(Message, props);
  /** Split state classNames */
  var _c = customHook.useSplitStateClassName(rawRest),
    stateClassNames = _c[0],
    rest = _c[1];
  /** Build class list */
  var classes = clsx__default['default'](
    typeof onDismiss === 'function' && 'dismissible',
    'message',
    stateClassNames,
    className
  );
  /* --------
   * Component Handlers
   * -------- */
  var handleDismiss = function (e) {
    if (typeof onDismiss === 'function') {
      onDismiss(e, props);
    }
  };
  /* --------
   * Internal Elements
   * -------- */
  var dismissIcon =
    typeof onDismiss === 'function' &&
    React.createElement(Icon, {
      name: 'times',
      className: 'dismiss',
      onClick: handleDismiss,
    });
  /* --------
   * Internal Content Generated
   * -------- */
  var messageContent = React.useMemo(
    function () {
      return (
        (header || content || icon) &&
        Header.create(
          {
            content: header,
            subheader: content,
            icon: icon,
          },
          { autoGenerateKey: false }
        )
      );
    },
    [header, content, icon]
  );
  /* --------
   * If element has children, render them
   * -------- */
  if (!reactUiCore.childrenUtils.isNil(children)) {
    return React.createElement(
      ElementType,
      _tslib.__assign({}, rest, { className: classes }),
      dismissIcon,
      children
    );
  }
  /* --------
   * Render the Component
   * -------- */
  return React.createElement(
    ElementType,
    _tslib.__assign({}, rest, { className: classes }),
    dismissIcon,
    messageContent
  );
};
Message.displayName = 'Message';

module.exports = Message;
//# sourceMappingURL=Message.js.map

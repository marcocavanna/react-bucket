'use strict';

var _tslib = require('../../_virtual/_tslib.js');
var React = require('react');
var clsx = require('clsx');
var reactUiCore = require('@appbuckets/react-ui-core');
var customHook = require('../../lib/customHook.js');
require('tiny-invariant');

function _interopDefaultLegacy(e) {
  return e && typeof e === 'object' && 'default' in e ? e : { default: e };
}

var clsx__default = /*#__PURE__*/ _interopDefaultLegacy(clsx);

/* --------
 * Component Render
 * -------- */
var BackdropInner = function (props) {
  var animated = props.animated,
    content = props.content,
    children = props.children,
    className = props.className,
    onClick = props.onClick,
    onClickOutside = props.onClickOutside,
    verticalAlign = props.verticalAlign,
    visible = props.visible,
    rest = _tslib.__rest(props, [
      'animated',
      'content',
      'children',
      'className',
      'onClick',
      'onClickOutside',
      'verticalAlign',
      'visible',
    ]);
  // ----
  // Define internal Ref to Switch classes and Style
  // ----
  var containerRef = React.useRef(null);
  var contentRef = React.useRef(null);
  /** Get the render element type */
  var ElementType = customHook.useElementType(BackdropInner, props);
  // ----
  // Build Component Handlers
  // ----
  var handleClick = function (e) {
    /** Call onClick Handler */
    if (onClick) {
      onClick(e, props);
    }
    /** Check if click is inside the content, if is it, return */
    if (
      contentRef.current &&
      contentRef.current !== e.target &&
      reactUiCore.doesNodeContainClick(contentRef.current, e)
    ) {
      return;
    }
    /** Call onClickOutside Prop */
    if (onClickOutside) {
      onClickOutside(e, props);
    }
  };
  // ----
  // Animate the Backdrop Enter, if is necessary
  // ----
  React.useEffect(
    function () {
      /** Exit if no need to animate container visibility */
      if (!animated) {
        return;
      }
      /** Add/Remove the visible classes */
      setTimeout(function () {
        if (containerRef.current && visible) {
          containerRef.current.classList.add('visible');
        }
        if (contentRef.current && visible) {
          contentRef.current.classList.add('visible');
        }
      });
    },
    [animated, visible]
  );
  // ----
  // Build Element Classes
  // ----
  var classes = clsx__default['default'](
    { visible: !animated && visible, animated: animated },
    reactUiCore.classByPattern(verticalAlign, 'content-%value%'),
    'backdrop',
    className
  );
  var contentClasses = clsx__default['default'](
    { visible: !animated && visible, animated: animated },
    'content'
  );
  // ----
  // Compute the Inner Content
  // ----
  var innerContent = reactUiCore.childrenUtils.isNil(children)
    ? content
    : children;
  // ----
  // Render the Content
  // ----
  return React.createElement(
    reactUiCore.Ref,
    { innerRef: containerRef },
    React.createElement(
      ElementType,
      _tslib.__assign({}, rest, { className: classes, onClick: handleClick }),
      innerContent &&
        React.createElement(
          'div',
          { ref: contentRef, className: contentClasses },
          innerContent
        )
    )
  );
};
/** Properly set the Display Name */
BackdropInner.displayName = 'BackdropInner';

module.exports = BackdropInner;
//# sourceMappingURL=BackdropInner.js.map

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
var Loader = function (props) {
  var _a = customHook.useSharedClassName(props),
    className = _a.className,
    _b = _a.rest,
    children = _b.children,
    content = _b.content,
    active = _b.active,
    centered = _b.centered,
    inline = _b.inline,
    inverted = _b.inverted,
    overlay = _b.overlay,
    type = _b.type,
    rawRest = _tslib.__rest(_b, [
      'children',
      'content',
      'active',
      'centered',
      'inline',
      'inverted',
      'overlay',
      'type',
    ]);
  /** Get Render Element Type */
  var ElementType = customHook.useElementType(Loader, props);
  /** Get the State Class */
  var _c = customHook.useSplitStateClassName(rawRest),
    stateClassName = _c[0],
    rest = _c[1];
  /** Check if has Children */
  var hasChildren = !reactUiCore.childrenUtils.isNil(children);
  /** Build Loader classes */
  var classes = clsx__default['default'](
    reactUiCore.classByValue(type),
    {
      centered: centered,
      inverted: inverted,
      inline: inline,
      overlay: overlay,
      active: active,
      'with-content': hasChildren || content,
      'is-normal': !props.size,
    },
    'loader',
    stateClassName,
    className
  );
  /** Build the Loader Content */
  var loaderContent = React.createElement(
    'div',
    { className: 'content' },
    hasChildren ? children : content
  );
  /** Circular loader is built using CSS only */
  if (type === 'circular') {
    return React.createElement(
      ElementType,
      _tslib.__assign({}, rest, { className: classes }),
      loaderContent
    );
  }
  /** An indeterminate Loader has a bar container and a content */
  if (type === 'indeterminate bar') {
    return React.createElement(
      ElementType,
      _tslib.__assign({}, rest, { className: classes }),
      React.createElement(
        'div',
        { className: 'progress-container' },
        React.createElement('div', { className: 'indeterminate-bar' })
      ),
      loaderContent
    );
  }
  /** Loader with Dots has 3 dot on type === dots, or 4 in type === circular dots */
  return React.createElement(
    ElementType,
    _tslib.__assign({}, rest, { className: classes }),
    React.createElement(
      'div',
      { className: 'dots-container' },
      React.createElement('div', { className: 'dot' }),
      React.createElement('div', { className: 'dot' }),
      React.createElement('div', { className: 'dot' }),
      type === 'circular dots' &&
        React.createElement('div', { className: 'dot' })
    ),
    loaderContent
  );
};
/** Set the default props */
Loader.defaultProps = {
  active: true,
  type: 'circular',
};
/** Set component displayName */
Loader.displayName = 'Loader';
/** Create the shorthand factory */
Loader.create = reactUiCore.createShorthandFactory(Loader, function (content) {
  return { content: content };
});

module.exports = Loader;
//# sourceMappingURL=Loader.js.map

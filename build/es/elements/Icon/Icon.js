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
var Icon = function (props) {
  var _a = customHook.useSharedClassName(props),
    className = _a.className,
    _b = _a.rest,
    bordered = _b.bordered,
    disabled = _b.disabled,
    fitted = _b.fitted,
    flip = _b.flip,
    iconStyle = _b.iconStyle,
    name = _b.name,
    onClick = _b.onClick,
    rotate = _b.rotate,
    solid = _b.solid,
    spin = _b.spin,
    unspaced = _b.unspaced,
    rawRest = _tslib.__rest(_b, [
      'bordered',
      'disabled',
      'fitted',
      'flip',
      'iconStyle',
      'name',
      'onClick',
      'rotate',
      'solid',
      'spin',
      'unspaced',
    ]);
  /** Get Component Element Type */
  var ElementType = customHook.useElementType(Icon, props);
  /** Split state className from rest props */
  var _c = customHook.useSplitStateClassName(rawRest),
    stateClasses = _c[0],
    rest = _c[1];
  /** Handle click, to disabled it if is disabled */
  var handleClick = function (e) {
    /** If icon has been disabled, prevent click */
    if (disabled) {
      e.preventDefault();
      return;
    }
    /** If the onClick function exists, invoke it */
    if (typeof onClick === 'function') {
      onClick(e, props);
    }
  };
  /** Get the FontAwesome Icon */
  var iconClassName = customHook.useFontawesomeIcon(name, iconStyle);
  /** Build icon ClassName */
  var classes = clsx__default['default'](
    'icon',
    stateClasses,
    className,
    iconClassName,
    solid,
    {
      bordered: bordered,
      disabled: disabled,
      fitted: fitted,
      unspaced: unspaced,
      clickable: onClick,
      'fa-spin': spin,
    },
    reactUiCore.classByPattern(flip, 'fa-flip-%value%'),
    reactUiCore.classByPattern(rotate, 'fa-rotate-%value%')
  );
  /** Draw the element */
  return React.createElement(
    ElementType,
    _tslib.__assign({}, rest, { className: classes, onClick: handleClick })
  );
};
Icon.displayName = 'Icon';
/** Set icon default props */
Icon.defaultProps = {
  as: 'i',
};
/** Icon could be created using a Shorthand */
Icon.create = reactUiCore.createShorthandFactory(Icon, function (name) {
  return { name: name };
});

module.exports = Icon;
//# sourceMappingURL=Icon.js.map

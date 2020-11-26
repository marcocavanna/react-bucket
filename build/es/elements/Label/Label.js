'use strict';

var _tslib = require('../../_virtual/_tslib.js');
var React = require('react');
var clsx = require('clsx');
var reactUiCore = require('@appbuckets/react-ui-core');
var customHook = require('../../lib/customHook.js');
require('tiny-invariant');
require('../Button/ButtonGroup.js');
var Icon = require('../Icon/Icon.js');
var Button = require('../Button/Button.js');
var LabelGroup = require('./LabelGroup.js');

function _interopDefaultLegacy(e) {
  return e && typeof e === 'object' && 'default' in e ? e : { default: e };
}

var clsx__default = /*#__PURE__*/ _interopDefaultLegacy(clsx);

/* --------
 * Component Render
 * -------- */
var Label = function (props) {
  var _a = customHook.useSharedClassName(props),
    className = _a.className,
    _b = _a.rest,
    children = _b.children,
    content = _b.content,
    disabled = _b.disabled,
    icon = _b.icon,
    onClick = _b.onClick,
    onRemove = _b.onRemove,
    removable = _b.removable,
    rawRest = _tslib.__rest(_b, [
      'children',
      'content',
      'disabled',
      'icon',
      'onClick',
      'onRemove',
      'removable',
    ]);
  /** Get the component element type */
  var ElementType = customHook.useElementType(Label, props);
  /** Split state className from rest props */
  var _c = customHook.useSplitStateClassName(rawRest),
    stateClasses = _c[0],
    rest = _c[1];
  /** Build the element class list */
  var classes = clsx__default['default'](
    onClick && 'clickable',
    { removable: removable, disabled: disabled },
    'label',
    stateClasses,
    className
  );
  /** Use an Hook to define the click handler */
  var handleClick = function (e) {
    if (onClick) {
      onClick(e, props);
    }
  };
  /** Compute the Icon Element */
  var iconElement = React.useMemo(
    function () {
      return Icon.create(icon, {
        autoGenerateKey: false,
      });
    },
    [icon]
  );
  /** Compute the Remove Button */
  var removeButton = React.useMemo(
    function () {
      if (!removable) {
        return null;
      }
      var handleLabelRemove = function (e) {
        if (!disabled && onRemove) {
          onRemove(e, props);
        }
      };
      return Button.create(
        typeof removable === 'boolean' ? { icon: 'times' } : removable,
        {
          autoGenerateKey: false,
          defaultProps: { className: 'remove', icon: 'times' },
          overrideProps: {
            disabled: disabled,
            flat: true,
            onClick: handleLabelRemove,
          },
        }
      );
    },
    [removable, disabled, onRemove, props]
  );
  /** Render the Component */
  return React.createElement(
    ElementType,
    _tslib.__assign({}, rest, { className: classes, onClick: handleClick }),
    React.createElement(
      'span',
      { className: 'content' },
      iconElement,
      React.createElement(
        'span',
        null,
        reactUiCore.childrenUtils.isNil(children) ? content : children
      ),
      removeButton
    )
  );
};
Label.displayName = 'Label';
Label.Group = LabelGroup;
Label.create = reactUiCore.createShorthandFactory(Label, function (content) {
  return { content: content };
});

module.exports = Label;
//# sourceMappingURL=Label.js.map

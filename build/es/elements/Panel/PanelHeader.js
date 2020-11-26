'use strict';

var _tslib = require('../../_virtual/_tslib.js');
var React = require('react');
var clsx = require('clsx');
var reactUiCore = require('@appbuckets/react-ui-core');
var customHook = require('../../lib/customHook.js');
require('tiny-invariant');
var Header = require('../Header/Header.js');

function _interopDefaultLegacy(e) {
  return e && typeof e === 'object' && 'default' in e ? e : { default: e };
}

var clsx__default = /*#__PURE__*/ _interopDefaultLegacy(clsx);

/* --------
 * Component Render
 * -------- */
var PanelHeader = function (props) {
  var _a = customHook.useSharedClassName(props),
    className = _a.className,
    _b = _a.rest,
    children = _b.children,
    content = _b.content,
    subheader = _b.subheader,
    icon = _b.icon,
    disabled = _b.disabled,
    divided = _b.divided,
    rest = _tslib.__rest(_b, [
      'children',
      'content',
      'subheader',
      'icon',
      'disabled',
      'divided',
    ]);
  var ElementType = customHook.useElementType(PanelHeader, props);
  var classes = clsx__default['default']('head', className);
  var headerElement = React.useMemo(
    function () {
      return Header.create(
        {
          content: content,
          subheader: subheader,
          icon: icon,
          divided: divided,
          disabled: disabled,
        },
        { autoGenerateKey: false }
      );
    },
    [content, subheader, icon, divided, disabled]
  );
  if (!reactUiCore.childrenUtils.isNil(children)) {
    return React.createElement(
      ElementType,
      _tslib.__assign({}, rest, { className: classes }),
      children
    );
  }
  return React.createElement(
    ElementType,
    _tslib.__assign({}, rest, { className: classes }),
    headerElement
  );
};
PanelHeader.displayName = 'PanelHeader';
PanelHeader.create = reactUiCore.createShorthandFactory(PanelHeader, function (
  content
) {
  return { content: content };
});

module.exports = PanelHeader;
//# sourceMappingURL=PanelHeader.js.map
